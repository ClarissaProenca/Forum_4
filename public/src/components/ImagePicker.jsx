import React, { useState } from 'react';
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ImagePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  margin-top: 10px;
`;

const ImagePickerComponent = ({ onImageSelected }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataURL = reader.result;
        setImagePreview(dataURL);
      };
      reader.readAsDataURL(file);

      // Upload da imagem para o Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      setUploading(true);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Acompanhamento do progresso do upload
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Upload failed', error);
          setUploading(false);
        },
        async () => {
          // Upload concluído com sucesso
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);
          setUploading(false);
          onImageSelected(downloadURL);
        }
      );
    }
  };

  return (
    <ImagePickerContainer>
      <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} />
      {imagePreview && <ImagePreview src={imagePreview} alt="Image Preview" />}
      {uploading && <p>Uploading...</p>}
    </ImagePickerContainer>
  );
};

export default ImagePickerComponent;
