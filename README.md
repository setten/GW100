# GW100
GW100 data repository and post processing tools

more information on the project at https://gw100.wordpress.com/

The most efficient way to contribute data is to fork this project. The next step is to clone you fork to your local machine. In your local version you can add your data and use the visuallization tools. Once you are ready to share your resuls, commit your json data files, push them to your repository and send a pull request. However, if this sound like a lot of hocus pocus just contact the author.

structures
----------
directory containig the structures in xyz format

data
----
directory containing the contributed data sets

data stored in json files with the fields:
```
code 
code_version
orbital (HOMO, HOMO-1, LUMO)
calc_type (scGW@functional, G0G0@functional, ...)
basis (PW, Gaussian, )
basis_name (def2-QZVP, ....)
basis_size (cardinallity or energy cutoff)
remark
DOI
qpe (linearized, solved)
parameters {name: value, ...}
data {cas: value, ...}
```

scripts
-------
scripts for postprocessing

The jupyter notebook can be used to convert a simple text file format of a data set into json format. For an example see
https://github.com/setten/GW100/blob/master/scripts/test_data/TM_GW_qzvp.txt

pages
-----
various html pages for data visualization:

http://htmlpreview.github.io/?https://github.com/setten/GW100/blob/master/pages/pairwise.html
http://htmlpreview.github.io/?https://github.com/setten/GW100/blob/master/pages/compare_all.html
http://htmlpreview.github.io/?https://github.com/setten/GW100/blob/master/pages/matrix.html
