import React, { useEffect, useState } from 'react';
import { Button, Typography, Modal, TextField, Box } from '@mui/material';
import './AreaDescriptionPageStyle.css';
import type Sector from '../../../types/SectorTypes';
import axiosInstance from '../../../api/axiosInstance';
import type { AllHousesPageProps } from '../../../types/UseAdminType';

export default function AreaDescriptionPage({ admin }: AllHousesPageProps): React.JSX.Element {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [editingSector, setEditingSector] = useState<Sector | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    axiosInstance
      .get<Sector[]>('/sectors')
      .then((response) => {
        setSectors(response.data);
      })
      .catch((error: unknown) => {
        console.error('Error fetching sectors:', error);
      });
  }, []);

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    sector: Sector | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    sector: null,
  });

  const handleMouseEnter = (sector: Sector, event: React.MouseEvent): void => {
    const img = event.currentTarget as HTMLImageElement;

    // Получаем размеры изображения
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left; // Смещаем по X
    const y = event.clientY - rect.top; // Смещаем по Y
    setTooltip({
      visible: true,
      x,
      y,
      sector,
    });
  };

  const handleMouseLeave = (): void => {
    setTooltip({ visible: false, x: 0, y: 0, sector: null });
  };

  const handleEditSector = (sector: Sector): void => {
    setEditingSector(sector);
    setNewStatus(sector.status);
    setOpenModal(true);
  };

  const handleSaveSector = async (): Promise<void> => {
    if (editingSector) {
      try {
        const updatedSector = { ...editingSector, status: newStatus };
        await axiosInstance.put(`/sectors/${editingSector.id.toString()}`, updatedSector);
        setSectors(sectors.map((s) => (s.id === editingSector.id ? updatedSector : s)));
        setOpenModal(false);
      } catch (error: unknown) {
        console.error('Error saving sector:', error);
      }
    }
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
    setEditingSector(null);
  };

  return (
    <div style={{ position: 'relative', height: '1080px' }}>
      <Typography variant="h4" className="mainPageContentTitle">
        Интерактивная карта поселка
      </Typography>
      <img
        className="townMap"
        src="/assets/townMap.png"
        useMap="#image-map"
        alt="Карта"
        style={{
          position: 'absolute',
          transform: 'translate(-50%,-50%)',
          top: '50%',
          left: '50%',
        }}
      />
      <map name="image-map" className="townMapMap">
        {sectors.map((sector) => (
          <area
            style={{
              border: '1px red',
              cursor: 'pointer',
            }}
            key={sector.id}
            coords={sector.coords}
            shape={sector.shape}
            alt={sector.name}
            onMouseEnter={(e) => handleMouseEnter(sector, e)}
            onMouseLeave={handleMouseLeave}
            onClick={admin.status === 'logged' ? () => handleEditSector(sector) : undefined}
          />
        ))}
      </map>
      {tooltip.visible && tooltip.sector && (
        <div
          style={{
            position: 'absolute',
            top: tooltip.y,
            left: tooltip.x,
            backgroundColor: tooltip.sector.status === 'В продаже' ? '#33b02d' : 'rgb(255, 44, 44)',
            border: '1px solid black',
            padding: '10px',
          }}
        >
          <p>{<strong>{tooltip.sector.name}</strong>}</p>
          {tooltip.sector.area !== 0 && tooltip.sector.area < 5000 && (
            <>
              <p>Статус: {tooltip.sector.status}</p>
              <p>Площадь: {tooltip.sector.area} м²</p>
              <p>Стоимость от {tooltip.sector.area * 8000} руб.</p>
            </>
          )}
          {tooltip.sector.area >= 5000 && (
            <>
              <p>Статус: {tooltip.sector.status}</p>
              <p>Площадь: {tooltip.sector.area} м²</p>
            </>
          )}
        </div>
      )}
      <Modal open={openModal} onClose={handleCloseModal} className="sectorModal">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" className="sectorModalTitle">
            Редактировать сектор
          </Typography>
          <TextField
            label="Статус"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleSaveSector}
            variant="contained"
            color="primary"
            className="buttonModal"
          >
            Сохранить
          </Button>
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            color="secondary"
            className="buttonModal"
          >
            Отменить
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
