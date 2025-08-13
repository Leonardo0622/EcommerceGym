'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/ManageUsers.module.css';
import { message } from 'antd';
import Link from 'next/link';

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Error al cargar usuarios');
      const data = await res.json();
      setUsers(data);
      setError(null);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setError('Error al cargar usuarios. Por favor, intenta de nuevo.');
      message.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Error al eliminar usuario');
      
      setUsers(users.filter(user => user._id !== userId));
      message.success('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      message.error('Error al eliminar usuario');
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!res.ok) throw new Error('Error al actualizar rol');

      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      message.success('Rol actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      message.error('Error al actualizar rol');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button onClick={fetchUsers} className={styles.retryButton}>
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gestión de Usuarios</h1>
        <p>Total de usuarios: {users.length}</p>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className={styles.userRow}>
                <td>
                  <div className={styles.userImageContainer}>
                    {user.profileImage ? (
                      <img
                        src={`http://localhost:5000/uploads/${user.profileImage}`}
                        alt={user.name}
                        className={styles.userImage}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40';
                        }}
                      />
                    ) : (
                      <div className={styles.userInitial}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleUpdateRole(user._id, e.target.value)}
                    className={styles.roleSelect}
                    disabled={user.role === 'admin'} // No permitir cambiar el rol del admin
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      onClick={() => setSelectedUser(user)}
                      className={`${styles.actionButton} ${styles.viewButton}`}
                      title="Ver detalles"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      disabled={user.role === 'admin'} // No permitir eliminar al admin
                      title="Eliminar usuario"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Detalles del Usuario</h2>
            <div className={styles.userDetails}>
              <div className={styles.userImageLarge}>
                {selectedUser.profileImage ? (
                  <img
                    src={`http://localhost:5000/uploads/${selectedUser.profileImage}`}
                    alt={selectedUser.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                ) : (
                  <div className={styles.userInitialLarge}>
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className={styles.userInfo}>
                <p><strong>Nombre:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Rol:</strong> {selectedUser.role}</p>
                <p><strong>ID:</strong> {selectedUser._id}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className={styles.closeButton}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
