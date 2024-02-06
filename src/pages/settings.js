import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SettingsNotifications } from "src/sections/settings/settings-notifications";
import { SettingsPassword } from "src/sections/settings/settings-password";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => (
  <>
    <Head>
      <title>Settings | IIGMA</title>
    </Head>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    {/* Google Tag Manager */}
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-HRSP7CL2CQ"></script>
    <script>
      {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-HRSP7CL2CQ');
    `}
    </script>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">Settings</Typography>
          <SettingsNotifications />
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
