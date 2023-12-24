import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  CircularProgress,
} from "@mui/material";
import { useProfile } from "src/hooks/use-profile";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails } from "src/redux/actions";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
  {
    value: "los-angeles",
    label: "Los Angeles",
  },
];

export const AccountProfileDetails = () => {
  const dispatch = useDispatch();
  const { userData, error, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getAllUserDetails());
  }, [dispatch]);
  const [values, setValues] = useState({
    firstName: "Anika",
    lastName: "Visser",
    email: "demo@devias.io",
    phone: "",
    state: "los-angeles",
    country: "USA",
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off"
noValidate
onSubmit={handleSubmit}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Card>
          <CardHeader subheader="The information can be edited"
title="Profile" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container
spacing={3}>
                <Grid xs={12}
md={6}>
                  <TextField
                    fullWidth
                    helperText="Please specify full name"
                    label="Full Name"
                    name="fullName"
                    onChange={handleChange}
                    required
                    value={userData.name}
                  />
                </Grid>
                <Grid xs={12}
md={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    onChange={handleChange}
                    required
                    value={userData.position}
                  />
                </Grid>
                <Grid xs={12}
md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    required
                    value={userData.email}
                  />
                </Grid>
                <Grid xs={12}
md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    value={userData.phone}
                  />
                </Grid>
                <Grid xs={12}
md={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    onChange={handleChange}
                    required
                    value={values.country}
                  />
                </Grid>
                <Grid xs={12}
md={6}>
                  <TextField
                    fullWidth
                    label="Select State"
                    name="state"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.state}
                  >
                    {states.map((option) => (
                      <option key={option.value}
value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained">Save details</Button>
          </CardActions>
        </Card>
      )}
    </form>
  );
};
