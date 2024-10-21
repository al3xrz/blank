import './App.css';
import { TextField, Box, Grid2 as Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'

function App() {
  return (
    <div className="App">
      <Box component="section" sx={{ mb: 1, p: 2, border: '1px solid lightgrey' }}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField id="outlined-basic" label="Фамилия" variant="outlined" sx={{ width: "100%" }}
              size='small' />
          </Grid>
          <Grid size={4}>
            <TextField size='small' id="outlined-basic" label="Имя" variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid size={4}>
            <TextField size='small' id="outlined-basic" label="Отчество" variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid size={12}>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
              <DatePicker slotProps={{ textField: { size: 'small' } }} label={"Дата рождения"} sx={{ width: "100%" }} />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
      <Box component="section" sx={{ mb: 1, p: 2, border: '1px solid lightgrey' }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField size='small' id="outlined-basic" label="Документ удостоверяющий личность" variant="outlined" sx={{ width: "100%" }}
              helperText="Двойной щелчек мыши - паспорт гражданина РФ " />
          </Grid>
          <Grid size={3}>
            <TextField size='small' id="outlined-basic" label="Номер" variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid size={3}>
            <TextField size='small' id="outlined-basic" label="Серия" variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid size={8}>
            <TextField size='small' id="outlined-basic" label="Наименование выдавшего органа" variant="outlined" sx={{ width: "100%" }}
              helperText="Правая кнопка мыши - выбор образца" />
          </Grid>
          <Grid size={4}>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
              <DatePicker slotProps={{ textField: { size: 'small' } }} label={"Паспорт выдан"} sx={{ width: "100%" }} />
            </LocalizationProvider>
          </Grid>
          <Grid size={6}>
            <TextField size='small' id="outlined-basic" label="СНИЛС" variant="outlined" sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={6}>
            <TextField size='small' id="outlined-basic" label="Полис  ОМС" variant="outlined" sx={{ width: "100%" }} />
          </Grid>

        </Grid>
      </Box>
      <Box component="section" sx={{ p: 2, border: '1px solid lightgrey' }} >
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField size='small' id="outlined-basic" label="Субъект РФ" variant="outlined" sx={{ width: "100%" }}
              helperText="Двойной щелчек - РД"
            />
          </Grid>
          <Grid size={4}>
            <TextField helperText="Правая кнопка мыши - список" size='small' id="outlined-basic" label="Город" variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid size={4}>
            <TextField size='small' helperText="Правая кнопка мыши - список" id="outlined-basic" label="Район" variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid size={4}>
            <TextField size='small' id="outlined-basic" label="Населенный пункт" variant="outlined" sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={4}>
            <TextField size='small' id="outlined-basic" label="Улица" variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid size={1}>
            <TextField size='small' id="outlined-basic" label="Строение" variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid size={1}>
            <TextField size='small' id="outlined-basic" label="Дом" variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid size={1}>
            <TextField size='small' id="outlined-basic" label="Корпус" variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid size={1}>
            <TextField size='small' id="outlined-basic" label="Квартира" variant="outlined" sx={{ width: "100%" }} />
          </Grid>

        </Grid>

      </Box>
      <Box component="section" sx={{ p: 2, border: '1px solid lightgrey' }} >
        <Grid container spacing={2}>
          <Grid size={6}>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
              <DatePicker slotProps={{ textField: { size: 'small' } }} label={"Дата рождения ребенка"} sx={{ width: "100%" }} />
            </LocalizationProvider>

          </Grid>
          <Grid size={6}>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
              <TimePicker slotProps={{ textField: { size: 'small' } }} label={"Время рождения ребенка"} sx={{ width: "100%" }} />
            </LocalizationProvider>
          </Grid>
          <Grid size={6}>
            <TextField size='small' id="outlined-basic" label="Вес" variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid size={6}>
            <TextField size='small' id="outlined-basic" label="Длина" variant="outlined" sx={{ width: "100%" }} />
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel size='small' id="demo-simple-select-label">Пол</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Пол"
                size='small'
              >
                <MenuItem value={'Мужской'}>Мужской</MenuItem>
                <MenuItem value={'Женский'}>Женский</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel size='small' id="demo-simple-select-label">Местность</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Местность"
                size='small'
              >
                <MenuItem value={'Городская'}>Городская</MenuItem>
                <MenuItem value={'Сельская'}>Сельская</MenuItem>
              </Select>
            </FormControl>
          </Grid>


        </Grid>

      </Box>


    </div>
  );
}

export default App;
