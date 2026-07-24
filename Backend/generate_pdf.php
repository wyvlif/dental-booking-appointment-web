<?php

require 'vendor/autoload.php';

use Dompdf\Dompdf;

$dompdf = new Dompdf();

$html = "
<h1>DentalCare Appointment Receipt</h1>
<p>Thank you for booking with us.</p>
<p>This is your official appointment confirmation.</p>
";

$dompdf->loadHtml($html);
$dompdf->render();

$dompdf->stream("appointment.pdf", ["Attachment" => 0]);

?>