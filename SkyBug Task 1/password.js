
    $(document).ready(function () {
        var $passwordInput = $('.password-to-validate');
        var $passwordFormGroup = $passwordInput.parent();

        function getPasswordTooltipContent() {
            var $tooltipContentContainer = $('.password');
            var password = $passwordInput.val();

            var validateRule = function (selector, test) {
                $(selector, $tooltipContentContainer).toggleClass('valid', test);
            };

            validateRule('.length-rule', password.length >= 8);
            validateRule('.uppercase-rule', /[A-Z]+/.test(password));
            validateRule('.lowercase-rule', /[a-z]+/.test(password));
            validateRule('.number-rule', /\d/.test(password));
            validateRule('.special-rule', /[\W|_]/.test(password));

            return $tooltipContentContainer.html();
        }

        var tooltipPlacement = $passwordInput.data('tooltipPlacement') || 'right';
        var tooltipTemplate = '<div class="tooltip password-tooltip para" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
        $passwordInput.tooltip({trigger: 'focus', placement: tooltipPlacement, html: true, template: tooltipTemplate, title: getPasswordTooltipContent});

        $passwordInput.on('input', function(){
            $(".password-tooltip", $passwordFormGroup).find('.tooltip-inner').html(getPasswordTooltipContent());
        });

        window.Parsley.addValidator('sbPassword', {
            validateString: function (value, req, elem) {
                var pattern = new RegExp('^.*[a-z].*$');

                if (!pattern.test(value)) {
                    window.Parsley.addMessage('en', 'sbPassword', 'Password must contain at least one lowercase letter');
                    return false;
                }
                pattern = new RegExp('^.*[A-Z].*$');
                if (!pattern.test(value)) {
                    window.Parsley.addMessage('en', 'sbPassword', 'Password must contain at least one uppercase letter');
                    return false;
                }
                pattern = new RegExp('^.*\\d.*$');
                if (!pattern.test(value)) {
                    window.Parsley.addMessage('en', 'sbPassword', 'Password must contain at least one number');
                    return false;
                }
                pattern = new RegExp('^.*[\\W|_].*$');
                if (!pattern.test(value)) {
                    window.Parsley.addMessage('en', 'sbPassword', 'Password must contain at least one special character (ex: -.,!@#$^%&amp;*)');
                    return false;
                }
                if (value.length < 8) {
                    window.Parsley.addMessage('en', 'sbPassword', 'Password must contain at least 8 characters');
                    return false;
                }
                pattern = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W|_]).{8,}$');
                if (!pattern.test(value)) {
                    window.Parsley.addMessage('en', 'sbPassword', 'Invalid password');
                    return false;
                }
                return true;
            }
        });
    });


    