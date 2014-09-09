IDSgrep in your browser via Emscripten
======================================

IDSgrep ([overview](http://tsukurimashou.sourceforge.jp/idsgrep.php.en), [manual](http://tsukurimashou.sourceforge.jp/idsgrep.pdf), [academic paper](http://arxiv.org/abs/1404.5585)) is a tool written by Matthew Skala for running "grep"-like text searches in databases of Chinese characters.

This repository contains an beta-state port to Javascript via Emscripten.

What does this mean?
--------------------
This means that a useful C program now runs in your browser's Javascript engine, having gone through a cross-compilation tool known as Emscripten. This may be the closest one can get to magic, for the next few minutes at least.

Geek's note: more specifically, the C code was compiled to LLVM intermediate representation (IR) by Clang, the C compiler, which Emscripten then compiled to Javascript.

Instructions for using
----------------------
Browse it now at http://fasiha.github.io/idsgrep-emscripten/! Run your Han character queries against the CVKVI and KanjiVG databases!

For information on what kind of queries can be run, see the [IDSgrep manual](http://tsukurimashou.sourceforge.jp/idsgrep.pdf), as well as the sample queries that are run when you first load the page. More tutorial material will soon be added.

Instructions for building
-------------------------
After getting the IDSgrep source with ancillary databases and setting up Emscripten, I run the `configure` script using Emscripten's `emconfigure` wrapper:
```
$ emconfigure ./configure --disable-docs --disable-colour-build --disable-silent-rules
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
$ emcc -O0  idsgrep.bc -o index.html --preload-file dict/cjkvi-j.eids --preload-file dict/cjkvi-j.bvec --preload-file dict/kanjivg.bvec  --preload-file dict/kanjivg.eids -s EXPORTED_FUNCTIONS="['_core_process', '_core_init', '_core_test', '_core_cook', '_set_output_recipe']" -s MEMFS_APPEND_TO_TYPED_ARRAYS=1
```
The output is hosted at http://fasiha.github.io/idsgrep-emscripten/.


Caveats
-------
- It's unclear why mnemonics like "[lr]" and "(anything)" mentioned in the [IDSgrep manual](http://tsukurimashou.sourceforge.jp/idsgrep.pdf), pages 19--20. I think this has something to do with the cooking process. This is a work-in-progress.


