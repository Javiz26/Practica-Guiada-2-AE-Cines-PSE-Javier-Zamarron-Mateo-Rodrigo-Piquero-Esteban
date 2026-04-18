import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../middleware/api";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";


// Recibe el cine completo para poder rellenar el formulario con sus datos actuales
// y onUpdated para avisar a CineItem de que recargue cuando se guarde
function EditCinema({ cinema }: { cinema: any }) {
    const { user } = useAuth();

    // Solo los ADMIN ven el botón 
    const isAdmin = user?.role === 'ADMIN';

    // Controla si el modal está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    // Estado del formulario, inicializado con los datos actuales del cine
    const [nombre, setNombre] = useState(cinema.nombre);
    const [capacidad, setCapacidad] = useState(cinema.capacidad);
    const [error, setError] = useState<string | null>(null);

    // Se ejecuta al pulsar Guardar
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await api.put(`/cinemas/${cinema.identificador}`, {
                nombre: nombre,
                capacidad: capacidad
            });
            closeModal();

        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al actualizar el cine');
        }
    };

    return (
        <>
            <div>
                {isAdmin && (
                    <Button
                        onClick={openModal}
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: 'orange', '&:hover': { backgroundColor: '#e65100' } }}
                    >
                        Editar Cine
                    </Button>
                )}
            </div>

            <Modal open={isOpen} onClose={closeModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" fontWeight={700} mb={2} color="#1976d2" align="center">
                        Editar Cine
                    </Typography>

                    {error && (
                        <Typography color="error" mb={2}>{error}</Typography>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField
                            label="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Capacidad"
                            type="number"
                            value={capacidad}
                            onChange={(e) => setCapacidad(Number(e.target.value))}
                            fullWidth
                            required
                        />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            <Button onClick={closeModal} variant="outlined" color="inherit">
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained">
                                Guardar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default EditCinema;