IDSgrep in your browser via Emscripten
======================================

IDSgrep ([overview](http://tsukurimashou.sourceforge.jp/idsgrep.php.en), [manual](http://tsukurimashou.sourceforge.jp/idsgrep.pdf), [academic paper](http://arxiv.org/abs/1404.5585)) is a tool written by Matthew Skala for running "grep"-like text searches in databases of Chinese characters.

This repository contains an alpha-state port to Javascript via Emscripten.

What does this mean?
--------------------
This means that a useful C program now runs in your browser's Javascript engine, having gone through a cross-compilation tool known as Emscripten. This may be the closest one can get to magic, for the next few minutes at least.

Geek's note: more specifically, the C code was compiled to LLVM intermediate representation (IR) by Clang, the C compiler, which Emscripten then compiled to Javascript.

Instructions
------------
After setting up Emscripten, I run the `configure` script using Emscripten's `emconfigure` wrapper:
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

Browse it now at http://fasiha.github.io/idsgrep-emscripten/! It's not super-exciting because it runs the equivalent of `idsgrep 高 dict/edict.eids`, that is, just a lookup, no matching, to print a single character's EIDS component breakdown and dictionary definition.

The HTML currently deployed has [small but crucial differences](https://github.com/fasiha/idsgrep-emscripten/blob/gh-pages/index.html#L1221-L1223) from the output of the above commands. Specifically, the Javascript memory ceiling is raised (due to the size of the dictionaries), and the command-line arguments are specified.

(Note I've included the KanjiVG and Edict2 databases with this repository, so you can start having some immediate CJK fun. See the IDSgrep documentation or your search engine for sources.)

If you want to run IDSgrep in node, build it as such and run it as follows:
```
$ emcc -O0  idsgrep.bc -o idsgrep.js --embed-file dict/cjkvi-j.eids --embed-file dict/cjkvi-j.bvec --embed-file dict/edict.bvec --embed-file dict/edict.eids  --embed-file dict/kanjivg.bvec  --embed-file dict/kanjivg.eids
$ node idsgrep.js 高 dict/edict.eids
```
Result (slightly edited to short-circuit Markdown formatting):
```
【高】,<高>⿳<亠>⿱丨一口<冋>⿵冂口｟([こう]) (suf) (1) (abbr) (See 高等学校) high school/(pref) (2) (See 高レベル) high-｠
【高】,<高>⿳<亠>⿱丨一口<冋>⿵冂口｟([たか(P);だか]) (n,n-suf) (usu. だか when n-suf) quantity/amount/volume/number/amount of money/(P)｠
```

Caveats
-------
Strong caveats.

- Regarding http://fasiha.github.io/idsgrep-emscripten/. It's not that the arguments `高 dict/edict.eids` are "hard-coded" as such, but that the Javascript only runs `main()` once, with a fixed of arguments. To change the arguments, for now, requires changing `index.html` (see `arguments: "高 dict/edict.eids".split(" "),` in the bottom `<script>` tag).
	+ I am having trouble getting `main()` to be invoked multiple times from Javascript, with the same arguments, let alone different ones. The `noExitRuntime` property of `Module` in `index.html` should allow me to re-`Module.run()` but doesn't. This speaks to my ignorance of Emscripten conventions.
	+ Even if we could do a complete tear-down and build-up for each invokation of `main()` with different arguments (different characters, different dictionaries), this is going to be inefficient. IDSgrep was designed as a stand-alone run-once command-line application, so it would read the same databases from disk each time it was called. Now, each time `main()` is invoked through Javascript, it will I think reload the databases. It would make more sense to add a daemon-like functionality to IDSgrep, if the eventual goal is to turn this into a RESTful service.
- IDSgrep's `-d` flag won't work because (getting technical here), as of this moment, `glob()` and `globfree()` are not implemented in Emscripten. You have to provide the dictionary (included in `dict/`) explicitly. Alon Zakai has just informed us that [these missing functions have been added](https://github.com/kripken/emscripten/issues/1944#issuecomment-54735169) so this caveat may soon disappear.
