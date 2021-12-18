import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

function PermissionCell({ user, permission }) {
  const [allowed, setAllowed] = useState(false);

  let requestBody = {
    input: {
      permission: permission,
      user: user,
    },
  };

  fetch("/v1/data/access/allow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      setAllowed(data.result);
    });

  return <Td>{allowed ? "✅" : "❌"}</Td>;
}

function PermissionsRow({ permission, users }) {
  return users.map((user, index) => {
    return <PermissionCell key={index} user={user} permission={permission} />;
  });
}

function PermissionMatrix({ users, permissions }) {
  return (
    <Table variant="striped" size="sm">
      <TableCaption>
        Open Policy Agent user permissions policy coverage
      </TableCaption>
      <Thead>
        <Tr>
          <Th isNumeric>Users</Th>
          {users.map((user, index) => (
            <Td key={index}>
              <Text fontSize="sm">{user}</Text>
            </Td>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Th colSpan={users.length + 1}>Permissions</Th>
        </Tr>
        {permissions.map((permission, index) => {
          return (
            <Tr key={index}>
              <Td>
                <Text fontSize="sm">{permission}</Text>
              </Td>
              <PermissionsRow permission={permission} users={users} />
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default PermissionMatrix;
