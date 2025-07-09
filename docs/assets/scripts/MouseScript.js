const mouse = document.querySelector('.mouse');

        var timeout;
        document.addEventListener("mousemove", (e) => {
            let x = e.clientX;
            let y = e.clientY;
            mouse.style.top = y + 'px';
            mouse.style.left = x + 'px';
            mouse.style.display = 'block';

            function mouseStopped() {
                mouse.style.display = 'none';
            }
            clearTimeout(timeout);
            timeout = setTimeout(mouseStopped, 1000);
        });
        document.addEventListener("mouseout", () => {
            mouse.style.display = 'none';
        });