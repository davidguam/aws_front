import React, { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fotoPath: null,  // Almacena el archivo
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'fotoPath') {
      const file = files[0];
      setFormData({ ...formData, fotoPath: file });
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = `${import.meta.env.VITE_API_URL}/usuarios`; // URL de la API

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);

    // Verifica si se ha seleccionado una imagen y adjunta
    if (formData.fotoPath) {
      formDataToSend.append('fotoPath', formData.fotoPath);
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formDataToSend,  // Aquí se envía el FormData con los datos del usuario y el archivo
      });

      if (response.ok) {
        alert('Usuario registrado con éxito');
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="juan123"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="foto" className="form-label">Foto de perfil</label>
            <input
              type="file"
              className="form-control"
              id="foto"
              name="fotoPath"
              accept="image/*"
              onChange={handleChange}
            />
            {imagePreview && (
              <div className="mt-2 text-center">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="img-thumbnail"
                  style={{ maxHeight: '150px', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
