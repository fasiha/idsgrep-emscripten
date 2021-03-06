/*
 * GENERATED CODE - DO NOT EDIT!
 * Edit mkwcw.c, which generates this, or the input to that
 * program, instead.  Distributions of IDSgrep will nonetheless
 * usually include a ready-made copy of this file because
 * compiling and running mkwcw.c requires a library and data
 * file that, although free, not everyone is expected to have.
 */

#include "_stdint.h"

/* node counts before simplification: 1654 959 328 */
/* node counts after simplification: 1630 599 134 */

typedef struct _WIDTH_BBD_ENT {
  int16_t child[8];
  char byte,shift;
} WIDTH_BDD_ENT;

static WIDTH_BDD_ENT width_bdd[]={
  {{-2,-2,-2,-2,2,3,4,4},0,3},
  {{5,6,7,8,9,10,11,11},0,3},
  {{-2,-2,-2,-2,12,12,12,12},0,5},
  {{-2,-2,-2,-2,13,13,13,13},0,5},
  {{-2,-2,-2,-2,14,14,14,14},0,5},
  {{-1,-1,-2,-2,15,15,15,15},0,5},
  {{-1,-1,-2,-2,16,16,16,16},0,5},
  {{-1,-1,-2,-2,17,17,17,17},0,5},
  {{-1,-1,-2,-2,18,18,18,18},0,5},
  {{19,20,21,22,-2,-2,-2,-2},0,0},
  {{23,23,23,23,-2,-2,-2,24},0,0},
  {{-2,-2,-2,-2,25,25,25,25},0,5},
  {{-2,26,27,28,29,-1,-1,-1},0,0},
  {{-1,-1,30,-1,-1,31,-2,32},0,0},
  {{33,33,-2,-2,-2,-2,-2,-2},0,0},
  {{34,-2,34,-2,-2,-2,-2,-2},0,0},
  {{-2,-2,-2,-2,-1,35,-2,-2},0,0},
  {{-2,-2,36,-2,-2,-2,37,38},0,0},
  {{39,40,-2,41,42,43,44,45},0,0},
  {{-2,-2,-2,-2,46,46,46,46},0,5},
  {{-2,-2,-2,-2,47,47,47,47},0,5},
  {{-2,-2,-2,-2,48,48,48,48},0,5},
  {{-2,-2,-2,-2,49,49,49,49},0,5},
  {{-2,-2,-2,-2,50,50,50,50},0,5},
  {{-2,-2,-2,-2,51,51,51,51},0,5},
  {{52,52,53,53,-2,-2,-2,-2},0,0},
  {{54,-2,-2,-2,-2,-2,-2,-2},1,3},
  {{-2,55,56,57,-2,-2,-2,58},1,3},
  {{59,-1,-1,-1,-1,-1,-1,-1},1,3},
  {{-1,-1,-1,-1,-1,-1,60,-1},1,3},
  {{61,61,61,62,63,64,63,63},1,0},
  {{-1,-1,-1,65,-2,-2,-2,-2},1,3},
  {{-2,-2,-2,-2,66,67,-2,68},1,3},
  {{-2,69,-2,69,-1,-1,-1,-1},1,3},
  {{-2,-2,-2,-2,-2,70,-2,-2},1,3},
  {{-1,-1,-1,-1,-1,-1,-2,-2},1,3},
  {{71,72,-2,-2,-2,-2,-2,-2},1,3},
  {{-2,-2,-1,-1,-1,-1,-1,73},1,3},
  {{74,74,-2,-2,-2,-2,-2,-2},1,3},
  {{75,-2,-1,76,-2,-2,-2,-2},1,3},
  {{-2,71,-1,-1,-2,-2,77,-2},1,3},
  {{-2,-2,78,73,79,80,-2,-2},1,3},
  {{-2,78,81,-2,-2,-2,-1,-1},1,3},
  {{-1,67,-2,-2,-2,-2,-2,-2},1,3},
  {{-2,-2,-2,-2,78,-1,82,82},1,3},
  {{-2,-2,-2,-2,-2,71,67,-2},1,3},
  {{83,84,85,86,87,88,89,90},1,0},
  {{91,92,-2,93,94,95,96,-2},1,3},
  {{97,98,-2,99,-2,100,-2,101},1,0},
  {{102,102,-1,-1,102,102,-1,-1},1,0},
  {{-2,103,-2,103,104,105,104,105},1,3},
  {{-2,-2,-2,-2,-2,106,-2,107},1,3},
  {{108,109,108,109,108,109,108,109},1,3},
  {{-1,-1,-2,-2,-1,-1,-2,-2},1,3},
  {{-2,-2,-2,-2,-1,110,-2,-2},1,0},
  {{-2,-2,-2,-2,111,-2,-2,-2},1,0},
  {{-2,112,-1,-1,-1,-1,-2,-2},1,0},
  {{-2,-2,-2,-2,-2,113,114,-2},1,0},
  {{-2,-2,-1,-1,-1,-1,-1,-1},1,0},
  {{115,-1,116,-1,-1,-1,-1,-1},1,0},
  {{-1,-1,-1,-1,-1,-1,-1,-2},1,0},
  {{-1,-1,-1,-2,-2,-2,-1,-1},1,3},
  {{-1,-1,117,-2,-2,-2,-1,-1},1,3},
  {{-1,-1,-2,-2,-2,-2,-1,-1},1,3},
  {{-1,-1,-2,-2,112,-2,-1,-1},1,3},
  {{-1,-1,-1,-1,-1,-1,118,-2},1,0},
  {{-2,-2,-2,-2,-1,-1,-1,-1},1,0},
  {{-1,-1,-1,-1,-2,-2,-2,-2},1,0},
  {{119,118,-2,-2,-1,120,-2,121},1,0},
  {{-1,-1,-1,-1,-2,-2,-2,122},1,0},
  {{-2,-2,-2,-2,-2,-1,-2,-2},1,0},
  {{-2,-2,-2,-1,-1,-1,-1,-1},1,0},
  {{-1,-1,-2,-2,-2,-2,-2,-2},1,0},
  {{-1,-1,-1,-1,-1,-1,-2,-1},1,0},
  {{-2,-1,-1,-2,-1,-1,-2,-1},1,0},
  {{-1,-1,-1,-1,-1,-1,-2,-2},1,0},
  {{-1,-1,-1,-2,-1,-1,-2,-2},1,0},
  {{-1,-2,-2,-2,-2,-2,-2,-2},1,0},
  {{-2,-2,-2,-2,-2,-2,-1,-1},1,0},
  {{-1,-1,-1,-1,-1,-2,-2,-1},1,0},
  {{-1,-2,-1,-1,-1,-1,-2,-2},1,0},
  {{-2,-1,-2,-2,-2,-2,-2,-2},1,0},
  {{-1,-2,-1,-2,-1,-2,-1,-2},1,0},
  {{123,124,125,126,123,124,125,126},1,3},
  {{127,128,129,130,127,128,129,130},1,3},
  {{-2,131,132,133,-2,131,132,133},1,3},
  {{-1,134,135,136,-1,134,135,136},1,3},
  {{137,138,-2,139,137,138,-2,139},1,3},
  {{140,141,142,143,140,141,142,143},1,3},
  {{144,145,-2,146,144,145,-2,146},1,3},
  {{142,147,148,149,142,147,148,149},1,3},
  {{150,151,152,-2,-1,-1,-1,-1},1,0},
  {{-2,-2,-2,-2,-2,153,-2,-2},1,0},
  {{-2,-2,-2,-2,154,155,156,157},1,0},
  {{158,-2,159,-2,160,-2,-2,-2},1,0},
  {{161,162,-2,-2,163,164,165,166},1,0},
  {{167,-2,168,168,-2,-2,-2,-1},1,0},
  {{169,-2,-2,-2,-2,-2,-2,-2},1,3},
  {{170,-2,-2,-2,-2,-2,-2,-2},1,3},
  {{-1,-2,-2,-2,-2,-2,171,-2},1,3},
  {{-2,-2,-2,-2,-2,-2,172,-2},1,3},
  {{-2,-2,-2,-2,-2,-2,112,-2},1,3},
  {{-1,-1,-2,-2,-1,-1,-2,-2},2,3},
  {{-2,173,174,175,-2,-2,-2,-2},1,0},
  {{176,-2,-2,177,178,179,180,-2},1,0},
  {{181,182,183,184,-2,-2,185,185},1,0},
  {{186,-2,-2,-2,186,-2,-2,-2},1,0},
  {{-1,-2,-2,125,-2,-2,-2,187},1,0},
  {{188,189,-2,-2,190,190,190,190},1,0},
  {{191,191,-2,-2,191,191,-2,-2},1,0},
  {{-1,-1,-1,-1,-2,-2,-2,-2},2,3},
  {{-2,192,192,-2,-2,-2,-2,-2},2,0},
  {{-2,-2,-2,-2,-1,-1,-1,-1},2,3},
  {{-2,-2,-2,-2,-2,-2,193,-1},2,3},
  {{-1,-1,194,-2,-2,-2,-2,-2},2,3},
  {{-1,-1,195,195,195,195,-1,196},2,0},
  {{-1,-1,-1,197,-1,-1,-1,-1},2,3},
  {{-1,-1,-2,-2,-2,-2,-2,-2},2,3},
  {{-1,-1,-1,-1,-1,-1,-2,-2},2,3},
  {{-2,-2,-1,-1,-2,-2,-1,-1},2,3},
  {{198,110,110,110,110,110,110,110},2,0},
  {{-2,-2,-2,-2,-1,-2,-2,-2},2,3},
  {{-2,194,-2,-2,-2,194,-2,-2},2,3},
  {{199,200,170,200,201,200,202,202},2,0},
  {{203,-2,-2,-2,-2,-2,-2,204},2,3},
  {{-2,-2,-2,-2,-2,-2,-2,193},2,3},
  {{-2,-2,-2,-2,-2,-2,205,194},2,3},
  {{-2,206,206,206,-2,-2,-2,-2},2,0},
  {{207,-1,-1,-2,-2,-2,208,208},2,3},
  {{209,-1,-1,-2,210,-2,-2,-2},2,3},
  {{211,212,-2,-2,211,212,-2,-2},2,3},
  {{213,213,213,-2,172,-2,-2,-2},2,0},
  {{-2,-2,-2,-2,-2,-2,-2,214},2,3},
  {{172,215,172,172,215,216,215,216},2,0},
  {{207,217,-2,-2,210,-2,-2,-2},2,3},
  {{-2,-2,121,121,218,218,117,218},2,0},
  {{-2,-1,-2,-2,-2,-1,-2,-2},2,3},
  {{213,213,219,-2,172,-2,-2,-2},2,0},
  {{220,-2,-2,-2,-2,-2,-2,214},2,3},
  {{-2,-2,-2,220,-2,-2,221,222},2,3},
  {{218,223,224,224,223,225,223,223},2,0},
  {{226,221,227,-2,210,-2,-2,-2},2,3},
  {{-2,213,228,228,213,117,-2,-2},2,0},
  {{215,215,215,215,215,215,215,216},2,0},
  {{213,213,-2,-2,172,-2,-2,-2},2,0},
  {{213,-2,213,-2,-2,-2,-2,-2},2,0},
  {{229,230,-1,-1,-1,-1,-1,231},2,3},
  {{232,221,-2,-2,-2,-2,-2,-2},2,3},
  {{-2,194,233,-2,-2,-2,-2,-2},2,3},
  {{-2,-2,-2,-2,-2,-2,228,-2},2,0},
  {{216,172,215,216,216,234,234,235},2,0},
  {{199,236,216,216,216,-2,174,174},2,0},
  {{237,238,-2,238,-2,-2,-2,-2},2,3},
  {{-2,-2,-2,239,-2,-2,-2,-2},2,3},
  {{-2,-2,119,119,119,-2,-2,-2},2,0},
  {{-2,-2,119,119,-2,-2,119,119},2,0},
  {{-2,-2,-2,-2,-2,-2,240,231},2,3},
  {{241,207,194,221,-2,-2,-2,-2},2,3},
  {{-2,197,-2,-2,-2,-2,-2,-2},2,3},
  {{-2,-2,-2,-2,-2,242,-2,-2},2,3},
  {{170,243,244,172,192,172,172,243},2,0},
  {{174,-2,-2,174,-2,-2,-2,245},2,0},
  {{246,247,246,248,248,249,250,249},2,0},
  {{194,-2,-2,-2,-2,-2,251,252},2,3},
  {{216,216,253,235,192,192,192,192},2,0},
  {{254,254,121,170,121,121,-2,-2},2,0},
  {{235,235,-2,-2,216,235,121,192},2,0},
  {{-2,-2,-2,-2,-2,239,255,-2},2,3},
  {{-2,-2,256,-1,257,258,259,259},2,3},
  {{-2,197,-2,-2,-2,260,-2,-2},2,3},
  {{-2,-2,-2,-2,-1,-1,-2,-2},2,3},
  {{216,216,-2,-2,216,216,-2,192},2,0},
  {{-2,-2,-2,-2,-2,-2,-2,-1},2,3},
  {{215,215,215,172,215,215,216,235},2,0},
  {{-2,-2,-2,-1,-2,-2,-2,-2},2,3},
  {{-2,-2,-2,-2,-2,-2,220,220},2,3},
  {{-2,-2,213,218,-2,121,228,-2},2,0},
  {{239,-2,-2,-2,-1,-1,220,-2},2,3},
  {{-2,-2,-2,-2,193,231,-2,-2},2,3},
  {{211,-1,261,-2,211,-1,261,-2},2,3},
  {{203,-2,-2,-2,-2,-2,262,263},2,3},
  {{-2,-2,-2,-2,-2,264,265,265},2,3},
  {{266,267,-2,-2,-2,-2,-2,-2},2,3},
  {{-2,-2,-2,-2,-2,-2,268,209},2,3},
  {{242,242,-2,-2,-2,204,193,193},2,3},
  {{-2,-2,-2,-2,238,217,-2,-2},2,3},
  {{-2,-2,-2,269,-2,-2,-2,-2},2,3},
  {{-2,-2,-2,-2,-2,-2,194,194},2,3},
  {{270,-2,-2,-2,-2,271,-2,-2},2,3},
  {{272,273,274,-2,275,-2,276,-2},2,0},
  {{-2,-2,277,277,-2,-2,277,277},2,3},
  {{-2,278,-2,278,-2,279,280,-2},2,0},
  {{-2,-2,-2,-2,-2,-1,-2,-2},2,3},
  {{-2,-2,-2,-2,-2,-2,-1,-1},2,0},
  {{-1,-1,-1,-1,-2,-2,-2,-2},2,0},
  {{-1,-1,-1,-1,-1,-2,-1,-1},2,3},
  {{-1,-1,-1,-1,-1,-1,-1,-2},2,3},
  {{-2,-2,-2,-1,-1,-1,-1,-1},2,0},
  {{-1,-1,-1,-1,-1,-2,-2,-2},2,3},
  {{-2,-2,-2,-1,-1,-2,-2,-2},2,3},
  {{-2,-2,-2,-1,-1,-1,-2,-2},2,3},
  {{-2,-2,-2,-1,-2,-1,-2,-2},2,3},
  {{-2,-2,-1,-1,-1,-1,-2,-2},2,3},
  {{-1,-1,-1,-2,-2,-2,-2,-2},2,0},
  {{-2,-2,-2,-2,-1,-1,-2,-2},2,0},
  {{-2,-1,-2,-2,-1,-1,-1,-1},2,0},
  {{-2,-2,-2,-1,-2,-2,-2,-1},2,3},
  {{-2,-1,-1,-1,-1,-1,-1,-1},2,0},
  {{-1,-1,-2,-2,-2,-1,-2,-1},2,0},
  {{-1,-2,-2,-2,-2,-2,-1,-1},2,0},
  {{-2,-2,-1,-1,-2,-2,-2,-2},2,0},
  {{-2,-2,-2,-2,-2,-2,-2,-1},2,0},
  {{-1,-1,-1,-1,-1,-1,-1,-2},2,0},
  {{-1,-2,-2,-2,-2,-2,-2,-2},2,3},
  {{-2,-2,-2,-2,-1,-2,-2,-1},2,0},
  {{-2,-2,-2,-2,-2,-2,-1,-1},2,3},
  {{-2,-2,-2,-2,-2,-2,-1,-2},2,3},
  {{-1,-2,-2,-2,-2,-1,-2,-1},2,0},
  {{-2,-1,-2,-2,-2,-2,-2,-2},2,3},
  {{-1,-2,-2,-2,-2,-2,-2,-1},2,3},
  {{-1,-1,-2,-2,-2,-2,-2,-2},2,0},
  {{-2,-2,-2,-2,-2,-1,-2,-1},2,0},
  {{-2,-1,-2,-2,-2,-2,-2,-2},2,0},
  {{-1,-2,-1,-2,-2,-2,-2,-2},2,3},
  {{-1,-2,-1,-2,-1,-2,-2,-2},2,3},
  {{-1,-1,-1,-2,-2,-2,-2,-2},2,3},
  {{-2,-1,-1,-1,-1,-1,-2,-2},2,0},
  {{-1,-2,-1,-2,-1,-2,-1,-2},2,0},
  {{-1,-2,-2,-2,-1,-2,-2,-2},2,3},
  {{-1,-1,-1,-1,-1,-2,-1,-1},2,0},
  {{-2,-2,-2,-2,-2,-1,-1,-1},2,0},
  {{-1,-1,-1,-1,-1,-1,-2,-2},2,0},
  {{-1,-2,-2,-2,-2,-2,-2,-2},2,0},
  {{-2,-2,-1,-1,-1,-1,-1,-1},2,0},
  {{-2,-2,-2,-2,-2,-1,-1,-1},2,3},
  {{-2,-2,-2,-2,-2,-1,-1,-2},2,3},
  {{-2,-2,-2,-1,-2,-2,-1,-2},2,3},
  {{-2,-2,-1,-2,-2,-1,-1,-2},2,0},
  {{-2,-2,-2,-2,-2,-1,-2,-2},2,0},
  {{-2,-2,-2,-2,-1,-1,-1,-1},2,0},
  {{-2,-2,-2,-2,-1,-1,-2,-1},2,0},
  {{-2,-2,-2,-2,-2,-2,-1,-2},2,0},
  {{-2,-1,-2,-2,-2,-1,-2,-2},2,0},
  {{-2,-2,-2,-2,-1,-2,-2,-1},2,3},
  {{-2,-2,-2,-2,-1,-2,-1,-1},2,3},
  {{-2,-2,-1,-2,-2,-2,-2,-2},2,3},
  {{-2,-2,-2,-1,-1,-1,-2,-1},2,3},
  {{-2,-2,-2,-1,-2,-1,-2,-1},2,3},
  {{-2,-2,-2,-1,-2,-1,-1,-1},2,3},
  {{-2,-2,-2,-1,-1,-2,-1,-1},2,3},
  {{-2,-2,-1,-1,-1,-2,-1,-1},2,3},
  {{-2,-2,-2,-2,-1,-2,-1,-1},2,0},
  {{-1,-1,-1,-2,-1,-2,-2,-2},2,0},
  {{-1,-2,-2,-2,-2,-2,-1,-2},2,3},
  {{-1,-2,-2,-2,-2,-1,-2,-2},2,3},
  {{-1,-1,-1,-1,-2,-2,-1,-1},2,0},
  {{-1,-1,-1,-2,-1,-1,-1,-1},2,0},
  {{-1,-2,-1,-1,-1,-1,-1,-1},2,0},
  {{-1,-2,-2,-2,-2,-1,-2,-2},2,0},
  {{-2,-2,-2,-2,-1,-2,-2,-2},2,0},
  {{-2,-2,-1,-1,-1,-1,-1,-2},2,0},
  {{-1,-1,-2,-2,-1,-1,-2,-2},2,0},
  {{-2,-2,-2,-1,-2,-2,-1,-1},2,0},
  {{-1,-1,-2,-2,-1,-2,-2,-2},2,0},
  {{-2,-1,-1,-1,-1,-1,-1,-2},2,0},
  {{-2,-1,-1,-2,-2,-1,-1,-2},2,0},
  {{-2,-2,-2,-1,-2,-2,-2,-2},2,0},
  {{-2,-2,-2,-2,-1,-2,-1,-2},2,0},
  {{-1,-2,-1,-1,-1,-2,-2,-1},2,0},
  {{-2,-2,-1,-2,-2,-2,-1,-2},2,0},
  {{-2,-2,-2,-2,-2,-2,-2,281},2,0},
  {{282,-2,282,-2,-2,-2,-2,-2},2,0},
  {{283,283,284,284,283,283,284,284},2,3},
  {{285,285,-2,-2,285,285,-2,-2},2,3},
  {{286,286,284,284,286,286,284,284},2,3},
  {{287,287,284,284,287,287,284,284},2,3},
  {{288,288,284,284,288,288,284,284},2,3},
  {{-2,-2,289,289,-2,-2,289,289},2,0},
  {{-2,290,-2,-2,-2,290,-2,-2},2,3},
  {{291,-2,-2,-2,291,-2,-2,-2},2,3},
  {{292,-2,-2,-2,292,-2,-2,-2},2,3},
  {{-2,-2,-2,-2,-2,293,-2,293},3,0},
  {{294,295,295,295,295,295,295,295},3,0},
  {{293,296,293,293,293,293,293,293},3,0},
  {{297,297,297,298,297,298,-2,297},3,0},
  {{299,299,299,299,299,299,299,-2},3,0},
  {{300,-2,-2,-2,-2,-2,301,302},3,3},
  {{303,303,303,304,305,304,306,307},3,0},
  {{296,296,293,293,293,293,297,305},3,0},
  {{308,308,308,309,309,309,309,309},3,0},
  {{-2,-2,-1,-1,-1,-2,-1,-2},3,0},
  {{310,310,293,297,297,297,297,311},3,0},
  {{312,313,-2,-2,-2,314,-2,-2},3,3},
  {{-2,-2,-2,-2,-2,-2,-2,-1},3,3},
  {{-2,-1,-2,-2,-2,-2,-2,-1},3,3},
  {{-1,-1,-2,-2,-2,-2,-2,-1},3,3},
  {{-1,-2,-2,-2,-2,-2,-2,-1},3,3},
  {{-2,-2,-2,-2,-2,-2,-1,-1},3,3},
  {{-2,-2,-2,-2,-2,-1,-1,-1},3,3},
  {{-1,-2,-2,-2,-2,-2,-2,-2},3,3},
  {{-1,-1,-2,-2,-2,-2,-2,-2},3,0},
  {{-2,-2,-2,-1,-1,-1,-1,-2},3,0},
  {{-2,-1,-1,-2,-2,-1,-2,-2},3,0},
  {{-1,-2,-2,-2,-2,-1,-1,-2},3,3},
  {{-2,-2,-2,-2,-2,-1,-1,-2},3,3},
  {{-2,-2,-2,-2,-2,-2,-1,-2},3,3},
  {{-2,-2,-2,-2,-2,-1,-2,-2},3,3},
  {{-2,-2,-2,-2,-1,-1,-2,-2},3,3},
  {{-1,-1,-1,-2,-1,-1,-1,-2},3,3},
  {{-1,-1,-2,-2,-1,-1,-2,-2},3,3},
  {{-2,-2,-2,-2,-2,-1,-2,-1},3,3},
  {{-2,-2,-2,-2,-1,-2,-1,-1},3,3},
  {{-1,-1,-1,-2,-2,-1,-1,-1},3,0},
  {{-1,-1,-1,-1,-2,-2,-2,-2},3,0},
  {{-2,-2,-1,-1,-1,-1,-2,-2},3,0},
};

int idsgrep_utf8cw(char *);

#define WBS width_bdd[search]

int idsgrep_utf8cw(char *cp) {
   int search;

   for (search=0;search>=0;)
     search=WBS.child[(cp[WBS.byte]>>WBS.shift)&7];
   if (search==-1)
     return 2;
   for (search=1;search>=0;)
     search=WBS.child[(cp[WBS.byte]>>WBS.shift)&7];
   return ((-1)-search);
}

