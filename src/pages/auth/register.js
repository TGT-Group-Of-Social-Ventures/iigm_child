import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { signUp } from "src/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const dispatch = useDispatch();
  const { status, error, loading } = useSelector((state) => state.signUpData);
  console.log("check", status);
  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchAndRedirect = async () => {
      await localStorage.setItem("verifyEmail", formik.values.email);
      await router.push("/auth/verifyEmail");
    };

    if (status) {
      fetchAndRedirect();
    }
  }, [status, router]);

  const formik = useFormik({
    initialValues: {
      email: "",
      userFullName: "",
      password: "",
      phoneNumber: "",
      userAge: "",
      submit : null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      userFullName: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(255).required("Password is required"),
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      userAge: Yup.number()
        .integer("Age must be an integer")
        .positive("Age must be a positive number")
        .required("Age is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await dispatch(signUp(values, headers));
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register | Devias Kit</title>
      </Head>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Register</Typography>
              <Typography color="text.secondary" variant="body2">
                Already have an account? &nbsp;
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="userFullName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                  fullWidth
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  label="Phone Number"
                  name="phoneNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.phoneNumber}
                />
                <TextField
                  error={!!(formik.touched.userAge && formik.errors.userAge)}
                  fullWidth
                  helperText={formik.touched.userAge && formik.errors.userAge}
                  label="Age"
                  name="userAge"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.userAge}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
