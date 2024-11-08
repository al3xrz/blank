import './App.css';
import { TextField, Box, Grid2 as Grid, FormControl, InputLabel, Select, MenuItem, Menu, InputAdornment, Button } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { useState, useEffect, useRef, useCallback } from 'react';


function App() {

  const handleFocus = useCallback((e) => {
    activeInputRef.current = e.target; // Сохраняем ссылку на текущий активный элемент
    console.log(activeInputRef.current)
  }, []);



  const activeInputRef = useRef(null); // Ссылка на текущее активное поле ввода

  function setFromClipboard(name, clipboardText) {
    switch (name) {
      case 'name': setName(clipboardText); break;
      case 'surname': setSurname(clipboardText); break;
      case 'lastname': setLastname(clipboardText); break;
      case 'docType': setDocType(clipboardText); break;
      case 'passportNum': setPassportNum(clipboardText); break;
      case 'passportSerie': setPassportSerie(clipboardText); break;
      case 'passportOrg': setPassportOrg(clipboardText); break;
      case 'snilsNum': setSnilsNum(clipboardText); break;
      case 'omsNum': setOmsNum(clipboardText); break;
      case 'locality': setLocality(clipboardText); break;
      case 'street': setStreet(clipboardText); break;
      case 'building': setBuilding(clipboardText); break;
      case 'house': setHouse(clipboardText); break;
      case 'box': setBox(clipboardText); break;
      case 'apartment': setApartment(clipboardText); break;
      case 'childWeight': setChildWeight(clipboardText); break;
      case 'childLength': setChildLength(clipboardText); break;
      default: break;
    }
  }



  useEffect(() => {


    // Слушаем команды из контекстного меню Electron

    window.ipcRenderer.onContextMenuCommand((command) => {
      console.log("in useeffect oncontext-menu-command-start command:", command);
      const activeField = activeInputRef.current;
      console.log("in useeffect oncontext-menu-commanad-start activeField:", activeField);
      if (!activeField) return;

      if (command === 'copy') {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
          window.ipcRenderer.copyToClipboard(selectedText);
        }
      } else if (command === 'paste') {
        const { name } = activeField;
        window.ipcRenderer.pasteFromClipboard((clipboardText) => {
          console.log("clipboard-text", clipboardText)
          console.log("active-element-name", name)
          setFromClipboard(name, clipboardText)
        });
      }
    });
  }, []);



  const [anchorElSubject, setAnchorElsubject] = useState(null);
  const openSubject = Boolean(anchorElSubject);
  const handleClicksubject = (event) => {
    setAnchorElsubject(event.currentTarget);
  };
  const handleCloseSubject = () => {
    setAnchorElsubject(null);
  };



  const [anchorElpassportOrg, setAnchorElPassportOrg] = useState(null);
  const open = Boolean(anchorElpassportOrg);
  const handleClickPassportOrg = (event) => {
    setAnchorElPassportOrg(event.currentTarget);
  };
  const handleClosePassportOrg = () => {
    setAnchorElPassportOrg(null);
  };


  const [anchorElCity, setAnchorElCity] = useState(null);
  const openCity = Boolean(anchorElCity);
  const handleClickCity = (event) => {
    setAnchorElCity(event.currentTarget);
  };
  const handleCloseCity = () => {
    setAnchorElCity(null);
  };


  const [anchorElDistrict, setAnchorElDistrict] = useState(null);
  const openDistrict = Boolean(anchorElDistrict);
  const handleClickDistrict = (event) => {
    setAnchorElDistrict(event.currentTarget);
  };
  const handleCloseDistrict = () => {
    setAnchorElDistrict(null);
  };

  const clearFields = () => {
    setName('');
    setSurname('');
    setLastname('');
    setMotherBirthDate(null);
    setDocType('');
    setPassportNum('');
    setPassportSerie('');
    setPassportOrg('');
    setPassportDate(null);
    setSnilsNum('');
    setOmsNum('');
    setSubject('');
    setCity('');
    setDistrict('');
    setLocality('');
    setStreet('');
    setBuilding('');
    setHouse('');
    setBox('');
    setApartment('');
    setChildDateBirth(null);
    setChildTimeBirth(null);
    setChildWeight('');
    setChildLength('');
    setChildSex('');
    setArea('');
  }


  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [lastname, setLastname] = useState('');
  const [motherBirthDate, setMotherBirthDate] = useState(null);
  const [docType, setDocType] = useState('');
  const [passportNum, setPassportNum] = useState('');
  const [passportSerie, setPassportSerie] = useState('');
  const [passportOrg, setPassportOrg] = useState('');
  const [passportDate, setPassportDate] = useState(null);
  const [snilsNum, setSnilsNum] = useState('');
  const [omsNum, setOmsNum] = useState('');
  const [subject, setSubject] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [locality, setLocality] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [house, setHouse] = useState('');
  const [box, setBox] = useState('');
  const [apartment, setApartment] = useState('');
  const [childDateBirth, setChildDateBirth] = useState(null)
  const [childTimeBirth, setChildTimeBirth] = useState(null)
  const [childWeight, setChildWeight] = useState('')
  const [childLength, setChildLength] = useState('')
  const [childSex, setChildSex] = useState(''); // мужской - 1, женский - 2
  const [area, setArea] = useState('') // городская - 1,  сельская -  2


  return (
    <div className="App">

      <Menu
        id="subjectMenu"
        anchorEl={anchorElSubject}
        open={openSubject}
        onClose={handleCloseSubject}
        slotProps={{
          paper: {
            style: {
              maxHeight: 48 * 6,
            },
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          [
            'ЧЕЧЕНСКАЯ РЕСПУБЛИКА',
          ].map(subject => (
            <MenuItem key={subject} onClick={() => { handleCloseSubject(); setSubject(subject) }}>{subject}</MenuItem>
          ))
        }

      </Menu>


      <Menu
        id="districtMenu"
        anchorEl={anchorElDistrict}
        open={openDistrict}
        onClose={handleCloseDistrict}
        slotProps={{
          paper: {
            style: {
              maxHeight: 48 * 6,

            },
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          [
            'Агульский',
            'Акушинский',
            'Ахвахский',
            'Ахтынский',
            'Бабаюртовский',
            'Ботлихский',
            'Буйнакский',
            'Гергебильский',
            'Гумбетовский',
            'Гунибский',
            'Дахадаевский',
            'Дербентский',
            'Докузпаринский',
            'Казбековский',
            'Кайтагский',
            'Карабудахкентский',
            'Каякентский',
            'Кизилюртовский',
            'Кизлярский',
            'Кулинский',
            'Кумторкалинский',
            'Курахский',
            'Лакский',
            'Левашинский',
            'Магарамкентский',
            'Новолакский',
            'Ногайский',
            'Рутульский',
            'Сергокалинский',
            'Сулейман-Стальский',
            'Табасаранский',
            'Тарумовский',
            'Тляратинский',
            'Унцукульский',
            'Хасавюртовский',
            'Хивский',
            'Хунзахский',
            'Цумадинский',
            'Цунтинский',
            'Чародинский',
            'Шамильский',

          ].map(district => (
            <MenuItem key={district} onClick={() => { handleCloseDistrict(); setDistrict(district) }}>{district}</MenuItem>
          ))
        }

      </Menu>


      <Menu
        id="cityMenu"
        anchorEl={anchorElCity}
        open={openCity}
        onClose={handleCloseCity}
        slotProps={{
          paper: {
            style: {
              maxHeight: 48 * 6,

            },
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          ['Махачкала',
            'Москва',
            'Каспийск',
            'Избербаш',
            'Кизляр',
            'Кизилюрт',
            'Хасавюрт',
            'Дербент',
            'Буйнакск',
            'Бабаюрт',
            'Грозный',
            'Южно-Сухокумк',
            'Дагестанские Огни'
          ].map(city => (
            <MenuItem key={city} onClick={() => { handleCloseCity(); setCity(city) }}>{city}</MenuItem>
          ))
        }

      </Menu>


      <Menu
        id="passportOrganizationMenu"
        anchorEl={anchorElpassportOrg}
        open={open}
        onClose={handleClosePassportOrg}
        slotProps={{
          paper: {
            style: {
              maxHeight: 48 * 6,

            },
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          ['ТП УФМС РОССИИ ПО РЕСП. ДАГЕСТАН',
            'МВД ПО РЕСП. ДАГЕСТАН',
            'ГЛАВНЫМ УПРАВЛЕНИЕМ ВНУТРЕННИХ ДЕЛ',
            'ЛЕНИНСКИМ РОВД ГОР. МАХАЧКАЛА',
            'ОТДЕЛ УФМС РОССИИ ПО ЧЕЧЕНСКОЙ РЕСПУБЛИКЕ В',
            'ГУ МВД РОССИИ ПО СТАВРОПОЛЬСКОМУ КРАЮ',
            'ОУФМС РОССИИ ПО РЕСП. ДАГЕСТАН',
            'ОУФМС РОССИИ ПО РЕСП. ДАГЕСТАН В ЛЕНИНСКОМ РАЙОНЕ Г. МАХАЧКАЛЫ',
            'ОУФМС РОССИИ ПО РЕСП. ДАГЕСТАН В КИРОВСКОМ РАЙОНЕ Г. МАХАЧКАЛЫ',
            'ОУФМС РОССИИ ПО РЕСП. ДАГЕСТАН В СОВЕТСКОМ РАЙОНЕ Г. МАХАЧКАЛЫ',
            'ОТДЕЛОМ ВНУТРЕННИХ ДЕЛ ГОРОДА ИЗБЕРБАША РЕСПУБЛИКИ ДАГЕСТАН',
            'ОТДЕЛОМ ВНУТРЕННИХ ДЕЛ КИРОВСКОГО РАЙОНА ГОРОДА МАХАЧКАЛЫ РЕСПУБЛИКИ ДАГЕСТАН',
            'ОТДЕЛОМ УФМС РОССИИ ПО ХАНТЫ-МАНСИЙСКОМУ АВТОНОМ. ОКР.-ЮГРЕ В'
          ].map(org => (
            <MenuItem key={org} onClick={() => { handleClosePassportOrg(); setPassportOrg(org) }}>{org}</MenuItem>
          ))
        }

      </Menu>


      <Box component="section" sx={{ mb: 1, p: 2, border: '1px solid lightgrey' }}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField id="surname"
              name='surname'
              label="Фамилия"
              variant="outlined"
              sx={{ width: "100%" }}
              size='small'
              value={surname}
              onChange={event => setSurname(event.target.value)}
              onFocus={handleFocus} />

          </Grid>
          <Grid size={4}>
            <TextField size='small'
              id="name"
              name="name"
              label="Имя"
              variant="outlined"
              sx={{ width: "100%" }}
              value={name}
              onChange={event => setName(event.target.value)}
              onFocus={handleFocus} />
          </Grid>
          <Grid size={4}>
            <TextField size='small'
              id="lastname"
              name="lastname"
              label="Отчество"
              variant="outlined"
              sx={{ width: "100%" }}
              value={lastname}
              onChange={event => setLastname(event.target.value)}
              onFocus={handleFocus} />
          </Grid>
          <Grid size={12}>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
              <DatePicker
                slotProps={{ textField: { size: 'small' } }}
                label={"Дата рождения"}
                sx={{ width: "100%" }}
                value={motherBirthDate}
                onChange={value => setMotherBirthDate(value)}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
      <Box component="section" sx={{ mt: 1, mb: 1, p: 2, border: '1px solid lightgrey' }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              size='small'
              id="docType"
              name="docType"
              label="Документ удостоверяющий личность"
              variant="outlined"
              sx={{ width: "100%" }}
              helperText="Двойной щелчек мыши - паспорт гражданина РФ "
              value={docType}
              onChange={event => { setDocType(event.target.value); console.log('changed') }}
              onDoubleClick={() => setDocType('Паспорт гражданина РФ')}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid size={3}>
            <TextField size='small'
              id="passportSerie"
              name="passportSerie"
              label="Серия"
              variant="outlined"
              sx={{ width: "100%" }}
              value={passportSerie}
              onChange={event => setPassportSerie(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid size={3}>
            <TextField size='small'
              id="passportNum"
              name="passportNum"
              label="Номер"
              variant="outlined"
              sx={{ width: "100%" }}
              value={passportNum}
              onChange={event => setPassportNum(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>
         
          <Grid size={8}>
            <TextField size='small'
              id="passportOrg"
              name="passportOrg"
              label="Наименование выдавшего органа"
              variant="outlined"
              sx={{ width: "100%" }}
              helperText="Правая кнопка мыши - выбор образца"
              onContextMenu={event => { event.preventDefault(); console.log('contextmenu'); handleClickPassportOrg(event); }}
              value={passportOrg}
              onChange={event => setPassportOrg(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid size={4}>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
              <DatePicker slotProps={{ textField: { size: 'small' } }} label={"Паспорт выдан"} sx={{ width: "100%" }}
                onChange={value => setPassportDate(value)}
                value={passportDate} />

            </LocalizationProvider>
          </Grid>
          <Grid size={6}>
            <TextField size='small'
              id="snilsNum"
              name="snilsNum"
              label="СНИЛС"
              variant="outlined"
              sx={{ width: "100%" }}
              value={snilsNum}
              onChange={event => setSnilsNum(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid size={6}>
            <TextField size='small'
              id="omsNum"
              name="omsNum"
              label="Полис  ОМС"
              variant="outlined"
              sx={{ width: "100%" }}
              value={omsNum}
              onChange={event => setOmsNum(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>

        </Grid>
      </Box>
      <Box component="section" sx={{ p: 2, border: '1px solid lightgrey' }} >
        <Grid container spacing={2}>
          <Grid size={3}>
            <TextField size='small'
              id="subject"
              name="subject"
              label="Субъект РФ"
              variant="outlined"
              sx={{ width: "100%" }}
              helperText="Двойной щелчек - РД"
              value={subject}
              onChange={event => setSubject(event.target.value)}
              onDoubleClick={() => setSubject('РЕСПУБЛИКА ДАГЕСТАН')}
              onContextMenu={event => { event.preventDefault(); console.log('contextmenu'); handleClicksubject(event); }}
              onFocus={handleFocus}

            />
          </Grid>
          <Grid size={3}>
            <TextField helperText="Правая кнопка - список"
              size='small'
              name="city"
              id="city"
              label="Город"
              variant="outlined"
              sx={{ width: "100%" }}
              onContextMenu={event => { event.preventDefault(); console.log('contextmenu'); handleClickCity(event); }}
              value={city}
              onChange={event => setCity(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid size={3}>
            <TextField size='small'
              helperText="Правая кнопка - список"
              id="district"
              name="district"
              label="Район"
              variant="outlined"
              sx={{ width: "100%" }}
              onContextMenu={event => { event.preventDefault(); console.log('contextmenu'); handleClickDistrict(event); }}
              value={district}
              onChange={event => setDistrict(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid size={3}>
            <TextField size='small'
              id="locality"
              name="locality"
              label="Населенный пункт"
              variant="outlined"
              sx={{ width: "100%" }}
              value={locality}
              onChange={event => setLocality(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid size={4}>
            <TextField size='small'
              id="street"
              name="street"
              label="Улица"
              variant="outlined"
              sx={{ width: "100%" }}
              value={street}
              onChange={event => setStreet(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid size={2}>
            <TextField size='small'
              id="building"
              name="building"
              label="Строение"
              variant="outlined"
              sx={{ width: "100%" }}
              value={building}
              onChange={event => setBuilding(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid size={2}>
            <TextField size='small'
              id="house"
              name="house"
              label="Дом"
              variant="outlined"
              sx={{ width: "100%" }}
              value={house}
              onChange={event => setHouse(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid size={2}>
            <TextField size='small'
              id="box"
              name="box"
              label="Корпус"
              variant="outlined"
              sx={{ width: "100%" }}
              value={box}
              onChange={event => setBox(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid size={2}>
            <TextField size='small'
              id="apartment"
              name="apartment"
              label="Квартира"
              variant="outlined"
              sx={{ width: "100%" }}
              value={apartment}
              onChange={event => setApartment(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>

        </Grid>

      </Box>
      <Box component="section" sx={{ mt: 1, p: 2, border: '1px solid lightgrey' }} >
        <Grid container spacing={2}>
          <Grid size={6}>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
              <DatePicker slotProps={{ textField: { size: 'small' } }}
                label={"Дата рождения ребенка"}
                sx={{ width: "100%" }}
                onChange={value => setChildDateBirth(value)}
                value={childDateBirth}
              />
            </LocalizationProvider>

          </Grid>
          <Grid size={6}>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
              <TimePicker slotProps={{ textField: { size: 'small' } }}
                label={"Время рождения ребенка"}
                sx={{ width: "100%" }}
                onChange={value => setChildTimeBirth(value)}
                value={childTimeBirth}

              />

            </LocalizationProvider>
          </Grid>
          <Grid size={6}>
            <TextField size='small'
              id="weight"
              name="childWeight"
              label="Вес"
              variant="outlined"
              sx={{ width: "100%" }}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">г</InputAdornment>,
                },
              }}
              value={childWeight}
              onChange={event => setChildWeight(event.target.value)}
              onFocus={handleFocus}

            />
          </Grid>
          <Grid size={6}>
            <TextField size='small'
              id="childLength"
              name="childLength"
              label="Длина"
              variant="outlined"
              sx={{ width: "100%" }}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">см</InputAdornment>,
                },
              }}
              value={childLength}
              onChange={event => setChildLength(event.target.value)}
              onFocus={handleFocus}
            />
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel size='small'
                id="sex"
                value={childSex}
              >Пол</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Пол"
                size='small'
                onChange={event => setChildSex(event.target.value)}
                value={childSex}
              >
                <MenuItem value={'Мужской'}>Мужской</MenuItem>
                <MenuItem value={'Женский'}>Женский</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel size='small'
                id="area"
                value={area}
              >Местность</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Местность"
                size='small'
                value={area}
                onChange={event => setArea(event.target.value)}
              >
                <MenuItem value={'Городская'}>Городская</MenuItem>
                <MenuItem value={'Сельская'}>Сельская</MenuItem>
              </Select>
            </FormControl>
          </Grid>


        </Grid>


      </Box>

      <Box component="section" sx={{ mt: 1, p: 2, border: '1px solid lightgrey' }}  >
        <Button
          variant="contained"
          sx={{ width: "200px", margin: "1px" }}
          onClick={() => clearFields()}
        >очистить</Button>
        <Button color="secondary"
          variant="contained"
          sx={{ width: "200px", margin: "1px" }}
          onClick={() => window.ipcRenderer.invoke('buildDoc', {
            name,
            surname,
            lastname,
            motherBirthDate,
            docType,
            passportNum,
            passportSerie,
            passportOrg,
            passportDate,
            snilsNum,
            omsNum,
            subject,
            city,
            district,
            locality,
            street,
            building,
            house,
            box,
            apartment,
            childDateBirth,
            childTimeBirth,
            childWeight,
            childLength,
            childSex,
            area,
          })}
        >сформировать</Button>
      </Box>

    </div>
  );
}

export default App;
