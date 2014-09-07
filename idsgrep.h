/*
 * General header file for IDSgrep
 * Copyright (C) 2012, 2013  Matthew Skala
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Matthew Skala
 * http://ansuz.sooke.bc.ca/
 * mskala@ansuz.sooke.bc.ca
 */

#include <sys/resource.h>
#include <sys/time.h>
#include <sys/types.h>

#include "config.h"
#include "_stdint.h"

#ifdef HAVE_BUDDY
# include <bdd.h>
#endif

#ifdef HAVE_INTTYPES_H
# include <inttypes.h>
#else
# if ULONG_MAX==4294967295UL
#  ifndef PRIu64
#   define PRIu64 "llu"
#  endif
#  ifndef PRIX64
#   define PRIX64 "llx"
#  endif
# else
#  ifndef PRIu64
#   define PRIu64 "lu"
#  endif
#  ifndef PRIX64
#   define PRIX64 "lx"
#  endif
# endif
#endif

#ifdef HAVE_PCRE
# include <pcre.h>
#endif

/**********************************************************************/

struct _NODE;
struct _BIT_FILTER;

typedef struct _NODE *(*MATCH_FN)(struct _NODE *);
typedef void (*BITVEC_FN)(struct _NODE *,struct _BIT_FILTER *);

typedef enum _MATCH_RESULT {
   MR_INITIAL=0,
     MR_FALSE,
     MR_TRUE,
     MR_AND_MAYBE,
     MR_OR_MAYBE,
     MR_NOT_MAYBE,
} MATCH_RESULT;

typedef struct _HASHED_STRING {
   struct _HASHED_STRING *next,*mate,*canonical;
   char *data;
   size_t length;
   int refs,arity;
   MATCH_FN match_fn;
   BITVEC_FN needle_bits_fn;
#ifdef HAVE_PCRE
   pcre *pcre_compiled;
   pcre_extra *pcre_studied;
#endif
   uintmax_t userpreds;
} HASHED_STRING;

typedef struct _NODE {
   HASHED_STRING *head,*functor;
#ifdef ANON_UNION_STRUCT
   union {
      struct _NODE *child[3];
      struct { struct _NODE *nc_next,*nc_needle,*nc_haystack; };
   };
#else
   struct _NODE *child[3];
#define nc_next child[0]
#define nc_needle child[1]
#define nc_haystack child[2]
#endif
   struct _NODE *match_parent;
   int refs,arity,complete;
   MATCH_RESULT match_result;
} NODE;

typedef enum _PARSE_STATE {
   PS_ERROR=-5,
     PS_SEEKING_FUNCTOR=-4,
     PS_COMPLETE_TREE=-3,
     PS_SEEKING_HEAD=-2,
     PS_READING_HEAD=-1,
     PS_READING_NULLARY=0,
     PS_READING_UNARY,
     PS_READING_BINARY,
     PS_READING_TERNARY,
} PARSE_STATE;

/**********************************************************************/

/* For consistency with Skala et al. (ACL 2010), LAMBDA is one *less*
 * than the number of bits set per item inserted in the Bloom filter.
 * In other words, LAMBDA is the maximum number of bits that may be
 * set and still have the unification result be "fail."
 */

#define LAMBDA 2

typedef struct _INDEX_HEADER {
   uint32_t magica,despell;
} INDEX_HEADER;

typedef struct _INDEX_RECORD {
   uint64_t bits[2];
   off_t offset;
} INDEX_RECORD;

typedef struct _BIT_FILTER {
   uint64_t bits[2];
   int lambda;
#ifdef HAVE_BUDDY
   bdd decision_diagram;
#endif
} BIT_FILTER;

/**********************************************************************/

/* assoc.c */

NODE *assoc_match_fn(NODE *);

/**********************************************************************/

/* bitvec.c */

#define MSEED_SIZE 13

extern uint32_t magic_seed[MSEED_SIZE];
extern int bitvec_debug;

void haystack_bits_fn(NODE *,uint64_t bits[2]);

void needle_fn_wrapper(NODE *,BIT_FILTER *);
void default_needle_fn(NODE *,BIT_FILTER *);

void anything_needle_fn(NODE *,BIT_FILTER *);
void anywhere_needle_fn(NODE *,BIT_FILTER *);
void and_needle_fn(NODE *,BIT_FILTER *);
void or_needle_fn(NODE *,BIT_FILTER *);
void not_needle_fn(NODE *,BIT_FILTER *);
void unord_needle_fn(NODE *,BIT_FILTER *);
void equal_needle_fn(NODE *,BIT_FILTER *);

/* This should be:
 *    - faster than GCC's builtin (which isn't great) when that doesn't
 *      translate into a native instruction
 *    - not a lot worse than the native instruction if it exists
 *    - faster than software implementations designed for BIG input, because
 *      of cache issues
 *    - faster on a 64-bit machine than software implementations designed
 *      for input smaller than 128 bits, because of sharing the multiply
 *    - not completely disastrous even on platforms where there is no
 *      good way to do population count.
 */
static inline int uint64_2_pop(uint64_t b[2]) {
   uint64_t x,y;

   x=b[0]-((b[0]>>1)&UINT64_C(0x5555555555555555));
   x=(x&UINT64_C(0x3333333333333333))+((x>>2)&UINT64_C(0x3333333333333333));
   x+=(x>>4);
   x&=UINT64_C(0x0F0F0F0F0F0F0F0F);

   y=b[1]-((b[1]>>1)&UINT64_C(0x5555555555555555));
   y=(y&UINT64_C(0x3333333333333333))+((y>>2)&UINT64_C(0x3333333333333333));
   y+=(y>>4);
   y&=UINT64_C(0x0F0F0F0F0F0F0F0F);
   
   return ((x+y)*UINT64_C(0x0101010101010101))>>56;
}

/**********************************************************************/

/* cook.c */

extern int cook_output,colourize_output,canonicalize_input;

void set_output_recipe(char *);
void write_bracketed_string(HASHED_STRING *,HASHED_STRING *,FILE *f);
void write_cooked_tree(NODE *,FILE *f);

/**********************************************************************/

/* hash.c */

HASHED_STRING *new_string(size_t,char *);
void delete_string(HASHED_STRING *);
NODE *new_node(void);
void free_node(NODE *);

/**********************************************************************/

/* idsgrep.c */

extern uint64_t tree_checks,tree_hits;

/**********************************************************************/

/* match.c */

NODE *default_match_fn(NODE *);

NODE *and_or_match_fn(NODE *);
NODE *anything_match_fn(NODE *);
NODE *anywhere_match_fn(NODE *);
NODE *equal_match_fn(NODE *);
NODE *not_match_fn(NODE *);
NODE *unord_match_fn(NODE *);

extern uint64_t memo_checks,memo_hits;

void check_memoization(void);
int tree_match(NODE *,NODE *);

/**********************************************************************/

/* parse.c */

extern HASHED_STRING *hashed_bracket[15];

extern NODE **parse_stack;
extern int stack_ptr;
extern PARSE_STATE parse_state;
extern int echoing_whitespace;

int construct_utf8(int,char *);
size_t parse(size_t,char *);
void register_syntax(void);

/**********************************************************************/

/* regex.c */

NODE *regex_match_fn(NODE *);

/**********************************************************************/

/* unilist.c */

void generate_unicode_list(NODE *,char *);

/**********************************************************************/

/* userpred.c */

void font_file_userpred(char *);

NODE *user_match_fn(NODE *);

/**********************************************************************/

/* Fowler-Noll-Vo hash, type 1a, on unsigned ints or uint32_ts,
 * whichever are bigger, but always folding to a uint32_t.
 * The "bump" argument, if nonzero, has the effect of hashing an
 * extra zero byte before the input; we use it to get two different
 * hash functions for (almost) the price of one, which is useful in
 * a few places in the code. */

static inline uint32_t fnv_hash(int m,char *a,int bump) {
   int i;
#if UINT_MAX==0xFFFFFFFFFFFFFFFF
   unsigned int hval=bump?12638153115695167455U:14695981039346656037U;
   
   for (i=0;i<m;i++) {
      hval^=a[i];
      hval*=1099511628211U;
   }
   
   return (uint32_t)(hval^(hval>>32));
#else
   uint32_t hval=bump?UINT32_C(84696351):UINT32_C(2166136261);

   for (i=0;i<m;i++) {
      hval^=a[i];
      hval*=UINT32_C(16777619);
   }
   
   return hval;
#endif
}
