import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const endpoint = `${import.meta.env.VITE_API_URL}/usuarios`;
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Error al obtener usuarios");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    console.log(`Editar usuario con ID: ${userId}`);
    // Aquí puedes implementar la lógica para editar el usuario
  };

  const handleDelete = (userId) => {
    console.log(`Eliminar usuario con ID: ${userId}`);
    // Aquí puedes implementar la lógica para eliminar el usuario
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Usuarios</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre de usuario</th>
              <th>Correo electrónico</th>
              <th>Foto de perfil</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <img
                    src={user.foto_url}
                    alt="Foto de perfil"
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;