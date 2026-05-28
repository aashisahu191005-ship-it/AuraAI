document.addEventListener(
    "DOMContentLoaded",
    () => {

        // =====================================
        // ELEMENTS
        // =====================================

        const uploadBtn =
            document.getElementById(
                "uploadPhotoBtn"
            );

        const profileUpload =
            document.getElementById(
                "profileUpload"
            );

        const profilePreview =
            document.getElementById(
                "profilePreview"
            );

        const cropModal =
            document.getElementById(
                "cropModal"
            );

        const cropImage =
            document.getElementById(
                "cropImage"
            );

        const closeCropModal =
            document.getElementById(
                "closeCropModal"
            );

        const cancelCropBtn =
            document.getElementById(
                "cancelCropBtn"
            );

        const saveCropBtn =
            document.getElementById(
                "saveCropBtn"
            );

        let cropper;

        // =====================================
        // OPEN FILE PICKER
        // =====================================

        uploadBtn.addEventListener(
            "click",
            () => {

                profileUpload.click();

            }
        );

        // =====================================
        // FILE SELECT
        // =====================================

        profileUpload.addEventListener(
            "change",
            (event) => {

                const file =
                    event.target.files[0];

                if(!file) return;

                const reader =
                    new FileReader();

                reader.onload =
                    function(e){

                        cropImage.src =
                            e.target.result;

                        cropModal.classList.add(
                            "active"
                        );

                        if(cropper){
                            cropper.destroy();
                        }

                        cropper =
                            new Cropper(
                                cropImage,
                                {
                                    aspectRatio:1,
                                    viewMode:1,
                                    dragMode:"move",
                                    autoCropArea:1,
                                    background:false,
                                    cropBoxResizable:false,
                                    cropBoxMovable:false
                                }
                            );

                    };

                reader.readAsDataURL(file);

            }
        );

        // =====================================
        // CLOSE MODAL
        // =====================================

        function closeModal(){

            cropModal.classList.remove(
                "active"
            );

            if(cropper){
                cropper.destroy();
                cropper = null;
            }
        }

        closeCropModal.addEventListener(
            "click",
            closeModal
        );

        cancelCropBtn.addEventListener(
            "click",
            closeModal
        );

        // =====================================
        // SAVE CROPPED IMAGE
        // =====================================

        saveCropBtn.addEventListener(
            "click",
            () => {

                if(!cropper) return;

                const canvas =
                    cropper.getCroppedCanvas({
                        width:300,
                        height:300
                    });

                const croppedImage =
                    canvas.toDataURL(
                        "image/png"
                    );

                profilePreview.src =
                    croppedImage;

                localStorage.setItem(
                    "auraProfileImage",
                    croppedImage
                );

                closeModal();

            }
        );

        // =====================================
        // LOAD SAVED IMAGE
        // =====================================

        const savedImage =
            localStorage.getItem(
                "auraProfileImage"
            );

        if(savedImage){

            profilePreview.src =
                savedImage;
        }

        // =====================================
        // BUTTONS
        // =====================================

        document
            .getElementById(
                "saveBtn"
            )
            .addEventListener(
                "click",
                () => {

                    alert(
                        "Settings saved successfully!"
                    );

                }
            );

        document
            .getElementById(
                "cancelBtn"
            )
            .addEventListener(
                "click",
                () => {

                    location.reload();

                }
            );

    }
);