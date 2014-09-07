/*
 * String hash table for IDSgrep
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

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "idsgrep.h"

/**********************************************************************/

static HASHED_STRING *free_strings[64]={
   NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,
   NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,
   NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,
   NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,
   NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,
   NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,
   NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
};

NODE *default_match_fn(NODE *);

HASHED_STRING *alloc_string(size_t len) {
   int i;
   HASHED_STRING *rval;
   char *save_data;

   if (len<=16)
     i=4;
   else
     for (i=5;(((size_t)1)<<i)<len;i++);
   if (free_strings[i]==NULL) {
      rval=(HASHED_STRING *)malloc(sizeof(HASHED_STRING)+(((size_t)1)<<i)+1);
      memset(rval,0,sizeof(HASHED_STRING));
      rval->data=(char *)(rval+1);
   } else {
      rval=free_strings[i];
      free_strings[i]=rval->next;
      save_data=rval->data;
      memset(rval,0,sizeof(HASHED_STRING));
      rval->data=save_data;
   }
   rval->length=len;
   rval->arity=-2;
   rval->match_fn=default_match_fn;
   rval->needle_bits_fn=default_needle_fn;
#ifdef HAVE_PCRE
   rval->pcre_compiled=NULL;
   rval->pcre_studied=NULL;
#endif
   rval->userpreds=UINTMAX_C(0);
   return rval;
}

void free_string(HASHED_STRING *s) {
   int i;
   
   if (s->length<=16)
     i=4;
   else
     for (i=5;(((size_t)1)<<i)<s->length;i++);
   s->next=free_strings[i];
#ifdef HAVE_PCRE
   if (s->pcre_compiled) {
      free(s->pcre_compiled); /* SNH */
      s->pcre_compiled=NULL; /* SNH */
   }
   if (s->pcre_studied) {
      free(s->pcre_studied); /* SNH */
      s->pcre_studied=NULL; /* SNH */
   }
#endif
   free_strings[i]=s;
}

#define MIN_HTABLE 100

static HASHED_STRING **hash_table=NULL;
static int hash_table_size=0;
static int hash_table_occupancy=0;

HASHED_STRING *new_string(size_t len,char *s) {
   uint32_t h,tmph;
   int i;
   HASHED_STRING *tmps;
   HASHED_STRING **new_table;
   
   /* make sure we have a table to begin with */
   if (hash_table_size==0) {
      hash_table=(HASHED_STRING **)malloc(sizeof(HASHED_STRING *)*MIN_HTABLE);
      hash_table_size=MIN_HTABLE;
      for (i=0;i<hash_table_size;i++)
	hash_table[i]=NULL;
   }
   
   /* search for the string in the hash table */
   h=fnv_hash(len,s,0);
   for (tmps=hash_table[h%hash_table_size];
	tmps && ((tmps->length!=len) || memcmp(tmps->data,s,len));
	tmps=tmps->next);
   
   /* if found, add a reference and we're done */
   if (tmps) {
      tmps->refs++;

     /* otherwise, it'll be a new entry */
   } else {
      
      /* first, deal with expanding the table */
      if (hash_table_occupancy>2*hash_table_size) {
	 hash_table_size*=2;
	 new_table=(HASHED_STRING **)
	   malloc(sizeof(HASHED_STRING *)*hash_table_size);
	 for (i=0;i<hash_table_size;i++)
	   new_table[i]=NULL;
	 for (i=0;i<(hash_table_size/2);i++)
	   while (hash_table[i]) {
	      tmps=hash_table[i];
	      hash_table[i]=tmps->next;
	      tmph=fnv_hash(tmps->length,tmps->data,0)%hash_table_size;
	      tmps->next=new_table[tmph];
	      new_table[tmph]=tmps;
	   }
	 free(hash_table);
	 hash_table=new_table;
      }
      
      /* actually add the new entry */
      tmps=alloc_string(len);
      memcpy(tmps->data,s,len);
      tmps->data[len]='\0';
      tmps->length=len;
      if (len==1)
	tmps->refs=2;
      else
	tmps->refs=1;
      tmps->next=hash_table[h%hash_table_size];
      hash_table[h%hash_table_size]=tmps;
      hash_table_occupancy++;
   }
   
   return tmps;
}

void delete_string(HASHED_STRING *s) {
   unsigned int h;
   HASHED_STRING *tmps;

   s->refs--;
   if (s->refs==0) {
      h=fnv_hash(s->length,s->data,0)%hash_table_size;
      if (hash_table[h]==s) {
	 hash_table[h]=s->next;
      } else {
	 for (tmps=hash_table[h];tmps->next!=s;tmps=tmps->next);
	 tmps->next=s->next;
      }
      free_string(s);
      hash_table_occupancy--;
   }
}

/**********************************************************************/

static NODE *free_nodes=NULL;

NODE *new_node(void) {
   NODE *rval;

   if (free_nodes) {
      rval=free_nodes;
      free_nodes=rval->nc_next;
   } else {
      rval=(NODE *)malloc(sizeof(NODE));
   }
   memset(rval,0,sizeof(NODE));
   rval->refs=1;
   return rval;
}

void free_node(NODE *n) {
   NODE *tmpn,*to_free=NULL;
   int i;

   n->refs--;
   if (n->refs==0) {
      n->match_parent=to_free;
      to_free=n;
   }
   
   while (to_free) {
      tmpn=to_free;
      to_free=tmpn->match_parent;
      
      for (i=0;i<3;i++)
	if (tmpn->child[i]!=NULL) {
	   tmpn->child[i]->refs--;
	   if (tmpn->child[i]->refs==0) {
	      tmpn->child[i]->match_parent=to_free;
	      to_free=tmpn->child[i];
	   }
	}

      if (tmpn->head!=NULL)
	delete_string(tmpn->head);
      if (tmpn->functor!=NULL)
	delete_string(tmpn->functor);

      tmpn->nc_next=free_nodes;
      free_nodes=tmpn;
   }
}

