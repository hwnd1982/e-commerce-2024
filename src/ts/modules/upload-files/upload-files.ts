export function initUploadFiles() {
    const attachItems = document.querySelectorAll('[data-attach]');

    attachItems.forEach(attachItem => {
        const attachInputs = attachItem.querySelector('[data-attach-inputs]');
        // const attachFiles = attachItem.querySelector('[data-attach-files]');

        attachItem.addEventListener('change', (event) => {
            const target = (event.target as HTMLInputElement);

            if (target.hasAttribute('data-attach-input')) {
                const attachInputsItems = attachInputs.querySelectorAll('input[type="file"]');
                let maxFiles = target.getAttribute("data-max-files");
                let filesNew = target.files;
                let newFileValue = filesNew[0].name;
                let newFile = '<input type="file" name="' + target.getAttribute("name") + '" class="' + target.getAttribute("class") + '" data-max-files="' + maxFiles + '" data-attach-input>';
                let isAttach = true;

                if (attachInputsItems.length) {
                    attachInputsItems.forEach(input => {
                        if (input.getAttribute("data-value") == newFileValue) {
                            isAttach = false;
                        }
                    });
                }

                if (typeof filesNew !== "undefined" && isAttach) {

                    for (var i = 0; i < filesNew.length; i++) {
                        uploadFile(attachItem, filesNew[i]);
                    }

                    if (attachInputsItems.length < +maxFiles) {
                        attachItem.querySelector("[data-attach-label]").insertAdjacentHTML('beforeend', newFile);
                    }

                    if (attachInputsItems.length <= +maxFiles) {
                        target.removeAttribute('id');
                        target.removeAttribute('class');
                        target.removeAttribute('data-max-files');
                        target.setAttribute('data-value', newFileValue);

                        attachItem.querySelector('[data-attach-inputs]').append(target);
                    }

                    if (attachInputs.querySelectorAll('input[type="file"]').length >= +maxFiles) {
                        attachItem.querySelector("[data-attach-label]").setAttribute("hidden", "hidden");
                    }
                }
            }
        });

        attachItem.addEventListener('click', (event) => {
            const target = (event.target as HTMLInputElement);

            if (target.closest('[data-attach-remove]') !== null || target.hasAttribute('data-attach-remove')) {
                const targetFile = target.closest("[data-attach-file]");

                const fileText = targetFile.getAttribute('data-value');
                const attachInputsItems = attachInputs.querySelectorAll('input[type="file"]');

                attachInputsItems.forEach((input: HTMLInputElement) => {
                    if (input.files) {
                        if (input.getAttribute("data-value") == fileText) {
                            input.remove();
                        }
                    }
                });

                targetFile.remove();

                attachItem.querySelector("[data-attach-label]").removeAttribute("hidden");
            }
        });

        function uploadFile(attachSelector: Element, file: File) {
            let attachFiles = attachSelector.querySelector("[data-attach-files]");

            attachFiles.insertAdjacentHTML('beforeend',
                `<div class="form-upload__file" data-attach-file data-value="${file.name}"><div class="form-upload__file-icon"><svg width="16" height="20" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 20C1.45 20 0.979333 19.8043 0.588 19.413C0.196 19.021 0 18.55 0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H10L16 6V18C16 18.55 15.8043 19.021 15.413 19.413C15.021 19.8043 14.55 20 14 20H2ZM9 7H14L9 2V7Z"/></svg></div><div class="form-upload__file-name">${file.name}</div><div class="form-upload__file-remove" title="Удалить" aria-label="Удалить" data-attach-remove><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M1.39995 13.3L0.699951 12.6L6.29995 6.99995L0.699951 1.39995L1.39995 0.699951L6.99995 6.29995L12.6 0.699951L13.3 1.39995L7.69995 6.99995L13.3 12.6L12.6 13.3L6.99995 7.69995L1.39995 13.3Z" /></svg></div></div>`
            )
        }
    });
}
