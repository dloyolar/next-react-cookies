import { ChangeEvent, FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Layout } from '../components/layouts';
import Cookies from 'js-cookie';
import axios from 'axios';

interface Props {
  theme: String;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;
    console.log({ selectedTheme });
    setCurrentTheme(selectedTheme);

    localStorage.setItem('theme', selectedTheme);
    Cookies.set('theme', selectedTheme);
  };

  const onClick = async () => {
    const { data } = await axios.get('/api/hello');
    console.log({ data });
  };

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
          <Button onClick={onClick}>Request</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = 'light', name = 'no name' } = req.cookies;

  const validThemes = ['light', 'dark', 'custom'];

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'dark',
      name,
    },
  };
};

export default ThemeChangerPage;
