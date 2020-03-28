<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

<<<<<<< HEAD

=======
>>>>>>> 4a5455f06ae1d9969f4299ac9f862a48cbde5102
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'mail.inbox.lv';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
<<<<<<< HEAD
$mail->Username = 'pulse_web@inbox.lv';                 // Наш логин
$mail->Password = 'dKHY1Xsf92';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('pulse_web@inbox.lv', 'STARTUP WOMEN');   // От кого письмо 
=======
$mail->Username = 'max12320@inbox.lv';                 // Наш логин
$mail->Password = 'bZTZ3fF5!d';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('max12320@inbox.lv', 'Pulse');   // От кого письмо 
>>>>>>> 4a5455f06ae1d9969f4299ac9f862a48cbde5102
$mail->addAddress('maxrolshchikov@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>