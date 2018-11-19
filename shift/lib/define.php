<?php 

$people = array('選択','山本','山本2','山本3','山本4','山本5',);
$peopleNum = count($people);

$nextMonth = date('Y年m月', strtotime(date('Y-m-01').'+1 month'));
$nextMonthNum = date('t', strtotime(date('Y-m-01').'+1 month'));


