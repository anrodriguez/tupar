<?php
 $arr_cpu = sys_getloadavg();
 $arr_mem = memory_get_usage();

 echo $arr_mem;
 
 ?>