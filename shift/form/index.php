<?php

include('/../lib/system/index_handle.php');

?>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
</head>
<body>
<div>
	<?php echo $_SESSION['error']; ?>
</div>

<form action="confirm.php" method="post">
	<p class="form-label">名前</p>
	<select type="select-one" name="i_people">
		<?php for($i=0; $i<$peopleNum; $i++) { ?>
		<option value="<?php echo $people[$i]; ?>"><?php echo $people[$i]; ?></option>
		<?php } ?>
	</select>
	<p class="form-label"><?php echo $nextMonth; ?>の希望休</p>
	<ul>
		<li><label><input type="checkbox" name="i_day[]" value="0"/>希望なし</label></li>
		<?php for($i=1; $i<=$nextMonthNum; $i++) { ?>
		<li><label><input type="checkbox" name="i_day[]" value="<?php echo $i; ?>"/><?php echo $i; ?>日</label></li>
		<?php } ?>
	</ul>
	<button type="submit" class="submit-button confirm" name="button" id="confirm_button">
		未入力の項目があります
	</button>

	<input type="hidden" name="i_date" class="" value="<?php echo $nextMonth;?>">
</form>

</body>
</html>