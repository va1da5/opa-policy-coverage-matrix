import "./App.css";
import users from "./users.json";
import permissions from "./permissions.json";
import PermissionMatrix from "./PermissionMatrix";

import { Center, Container, Box } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <br />
      <br />
      <Center>
        <Container maxW="container.md">
          <Box borderWidth="1px" borderRadius="lg">
            <PermissionMatrix users={users} permissions={permissions} />
          </Box>
        </Container>
      </Center>
    </div>
  );
}

export default App;
