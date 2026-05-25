<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Contact Message</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5; padding:20px 0;">
        <tr>
            <td align="center">

                <!-- Container -->
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #ef1968, #d01558); padding:20px; text-align:center;">
                            <img src="https://dev.rembulanrelief.org/images/logodannamasampingputihPNG.png" alt="The AUN Foundation" width="120" style="margin-bottom:10px;">
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:30px;">

                            <p style="margin:0 0 20px; color:#333;">
                                You have received a new message from your website contact form.
                            </p>

                            <!-- Info Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000; border-radius:10px; padding:20px;">
                                <tr>
                                    <td style="padding:8px 0;"><strong>Nama:</strong></td>
                                    <td style="padding:8px 0;">{{ $nama }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0;"><strong>Email:</strong></td>
                                    <td style="padding:8px 0;">{{ $email }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0;"><strong>Subjek:</strong></td>
                                    <td style="padding:8px 0;">{{ $subjek }}</td>
                                </tr>
                            </table>

                            <!-- Message -->
                            <div style="margin-top:25px;">
                                <p style="margin-bottom:10px; font-weight:bold; color:#333;">Pesan:</p>
                                <div style="background:#f9f9f9; padding:15px; border-radius:8px; color:#555; line-height:1.6;">
                                    {{ $pesan }}
                                </div>
                            </div>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f5f5f5; text-align:center; padding:20px; font-size:12px; color:#888;">
                            <p style="margin:0;">
                                © {{ date('Y') }} Rembulan Relief. All rights reserved.
                            </p>
                            <p style="margin:5px 0 0;">
                                This email was sent from your website contact form.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>