# GW100
GW100 data repository and post processing tools

more information on the project at https://gw100.wordpress.com/


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
calc_type (dft@functional, g0w0@functional, ...)
basis (PW, Gaussian, )
basis_name 
basis_size (cardinallity or energy cutoff)
remark
parameters {name: value, ...}
data {cas: value, ...}
```

scripts
-------
scripts for postprocessing

the jupyter notebook can be used to convert a simle text file format of a data set into json format

pages
-----
various html pages for data visualization
