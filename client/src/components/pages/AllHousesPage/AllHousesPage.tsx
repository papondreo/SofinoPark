import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Container,
  Modal,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './AllHousesPage.css';
import type { CottageType } from '../../../types/HousePageType';
import type { AllHousesPageProps } from '../../../types/UseAdminType';
import axiosInstance from '../../../api/axiosInstance';

export default function AllHousesPage({ admin }: AllHousesPageProps): React.JSX.Element {
  const [cottages, setCottages] = useState<CottageType[]>([]);
  const [editingCottage, setEditingCottage] = useState<CottageType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newCottage, setNewCottage] = useState<CottageType>({
    id: 0,
    name: '',
    cost: '',
    area: '',
  });

  // Обработчик изменений в форме
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setNewCottage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработчик отправки формы
  const submitHandler = async (): Promise<void> => {
    try {
      const response = await axiosInstance.post<CottageType>('/cottages', newCottage);
      console.log('Дом добавлен:', response.data);
      setCottages((prev) => [...prev, response.data]);
      setAddModalOpen(false);
      setNewCottage({ id: 0, name: '', cost: '', area: '' });
    } catch (error) {
      console.error('Ошибка при добавлении дома:', error);
    }
  };

  useEffect(() => {
    axiosInstance
      .get<CottageType[]>('/cottages')
      .then((response) => {
        setCottages(response.data);
      })
      .catch((error: unknown) => {
        console.error('Error fetching cottages:', error);
      });
  }, []);

  const handleEditCottage = (cottage: CottageType): void => {
    setEditingCottage(cottage);
    setOpenModal(true);
  };

  const handleSaveCottage = async (): Promise<void> => {
    if (editingCottage) {
      try {
        await axiosInstance.put(`/cottages/${editingCottage.id.toString()}`, editingCottage);
        setCottages(cottages.map((c) => (c.id === editingCottage.id ? editingCottage : c)));
        setOpenModal(false);
      } catch (error: unknown) {
        console.error('Error saving cottage:', error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (editingCottage) {
      setEditingCottage({ ...editingCottage, [event.target.name]: event.target.value });
    }
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
    setEditingCottage(null);
  };
  const modalCloseHandler = (): void => {
    setAddModalOpen(false);
    setNewCottage({ id: 0, name: '', cost: '', area: '' });
  };
  return (
    <Box className="cottages-container">
      <Container>
        <Typography variant="h3" gutterBottom className="allHousesTitle">
          Наши коттеджи
        </Typography>

        {admin.data && (
          <Button className="add-button" onClick={() => setAddModalOpen(true)}>
            Добавить
          </Button>
        )}
        <div className="cottages-grid">
          {cottages.map((cottage) => (
            <Card key={cottage.id} className="cottage-card">
              <Link
                to={`/house/${cottage.id.toString()}`}
                state={{ cottage }}
                className="cottage-link"
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={`/assets/cottages/cot${cottage.id.toString()}/mainbg.jpg`}
                  alt="Cottage photo"
                />
                <CardContent>
                  <Typography variant="h6">{cottage.name}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Площадь: {cottage.area} м²
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Стоимость: {cottage.cost} рублей
                  </Typography>
                </CardContent>
              </Link>
              {admin.data && (
                <Button onClick={() => handleEditCottage(cottage)}>Редактировать</Button>
              )}
            </Card>
          ))}
        </div>
      </Container>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="modalContent">
          <Typography variant="h6">Редактировать коттедж</Typography>
          <TextField
            label="Название"
            name="name"
            value={editingCottage?.name ?? ''}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Стоимость"
            name="cost"
            value={editingCottage?.cost ?? ''}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Площадь"
            name="area"
            value={editingCottage?.area ?? ''}
            onChange={handleInputChange}
            margin="normal"
          />
          <Button
            onClick={handleSaveCottage}
            variant="contained"
            color="primary"
            className="modalButton"
          >
            Сохранить
          </Button>
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            color="secondary"
            className="modalButton"
          >
            Отменить
          </Button>
        </Box>
      </Modal>

      <Modal open={addModalOpen} onClose={modalCloseHandler}>
        <Box className="modalContent">
          <Typography variant="h6">Добавить новый коттедж</Typography>
          <TextField
            label="Название"
            name="name"
            value={newCottage.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Стоимость"
            name="cost"
            value={newCottage.cost}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Площадь"
            name="area"
            value={newCottage.area}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            onClick={submitHandler}
            variant="contained"
            color="primary"
            className="modalButton"
          >
            Добавить
          </Button>
          <Button
            onClick={modalCloseHandler}
            variant="outlined"
            color="secondary"
            className="modalButton"
          >
            Отменить
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
