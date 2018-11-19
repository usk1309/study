<?php 

session_start();
require_once('/../define.php');
unset($_SESSION['error']);

// 配列のキーを変数名に変換
extract($_POST);

//年・月を取得
$year = mb_substr($i_date, 0, 4);
$month = mb_substr($i_date, 5, 2);

if(isset($i_people) && $i_people !== '選択') {

	$person = array_search($i_people, $people);

} else {
	$_SESSION['error'] = '名前は"選択"以外を選択してください';
	header("Location: http://tool.localhost/shift/form/");
	exit;
}

if(isset($i_day)) {
	$hope = implode(',', $i_day);

	foreach ($i_day as $k => $v) {
		if($v === '0') {
			$hope = '0';
		}
	}
}
