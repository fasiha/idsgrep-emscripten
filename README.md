IDSgrep in your browser via Emscripten
======================================

IDSgrep ([overview](http://tsukurimashou.sourceforge.jp/idsgrep.php.en), [manual](http://tsukurimashou.sourceforge.jp/idsgrep.pdf), [academic paper](http://arxiv.org/abs/1404.5585)) is a tool for running "grep"-like text searches in databases of Chinese characters.

This repository contains an alpha-state port to Javascript via Emscripten.

Instructions
------------
After setting up Emscripten, I run

```
$ emconfigure ./configure --disable-docs --enable-edict-decomp=cjkvi-j --disable-colour-build --disable-silent-rules
```

Then, because `emconfigure` doesn't seem to respect CFLAGS command-line arguments, I have to manually edit the resulting Makefile (included in this repository, but will be overwritten by the above) to include

```make
CFLAGS = -O0 --llvm-opts 0
```

Next, execute the Makefile within Emscripten:

```
$ emmake make
```

Rename the LLVM intermediate representation (IR) bitcode to have .bc extension so `emcc` knows what to do with it, and then build it for the web!:

```
$ cp idsgrep idsgrep.bc 

$ emcc -O0  idsgrep.bc -o index.html --preload-file dict/cjkvi-j.eids --preload-file dict/cjkvi-j.bvec --preload-file dict/edict.bvec --preload-file dict/edict.eids  --preload-file dict/kanjivg.bvec  --preload-file dict/kanjivg.eids
```

(Note I've included the KanjiVG and Edict2 databases with this repository, so you can start having some immediate CJK fun. See the IDSgrep documentation or your search engine for sources.)

If you want to run IDSgrep in node, build it as such and run it as follows:

```
$ emcc -O0  idsgrep.bc -o idsgrep.js --embed-file dict/cjkvi-j.eids --embed-file dict/cjkvi-j.bvec --embed-file dict/edict.bvec --embed-file dict/edict.eids  --embed-file dict/kanjivg.bvec  --embed-file dict/kanjivg.eids

$ node idsgrep.js  高 dict/edict.eids
```
Result (slightly edited to short-circuit Markdown formatting):
```
【高】,<高>⿳<亠>⿱丨一口<冋>⿵冂口｟([こう]) (suf) (1) (abbr) (See 高等学校) high school/(pref) (2) (See 高レベル) high-｠
【高】,<高>⿳<亠>⿱丨一口<冋>⿵冂口｟([たか(P);だか]) (n,n-suf) (usu. だか when n-suf) quantity/amount/volume/number/amount of money/(P)｠
```

Caveats
-------
Many caveats

- It's not that the arguments `高 dict/edict.eids` are "hard-coded" as such, but that the Javascript only runs `main()` once, with a fixed of arguments. To change the arguments, for now, requires changing `index.html`.