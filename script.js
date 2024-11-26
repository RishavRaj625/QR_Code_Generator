        document.getElementById('generateBtn').addEventListener('click', generateQRCode);

        function generateQRCode() {
            const dataInput = document.getElementById('dataInput').value;
            const qrType = document.getElementById('qrType').value;
            const qrPreview = document.getElementById('qrPreview');

            if (!dataInput) {
                alert('Please enter some data to generate a QR code.');
                return;
            }

            let data = dataInput;

            // Handle different QR code types
            switch (qrType) {
                case 'url':
                    if (!dataInput.startsWith('http://') && !dataInput.startsWith('https://')) {
                        data = 'http://' + dataInput;
                    }
                    break;
                case 'contact':
                    data = `MECARD:N:Your Name;TEL:${dataInput};EMAIL:example@example.com;;`;
                    break;
                // Default is text, no changes needed
            }

            qrPreview.innerHTML = ''; // Clear previous QR code

            QRCode.toCanvas(data, { errorCorrectionLevel: 'H' }, function (err, canvas) {
                if (err) {
                    console.error(err);
                    alert('Failed to generate QR code.');
                    return;
                }
                qrPreview.appendChild(canvas);
            });
        }
