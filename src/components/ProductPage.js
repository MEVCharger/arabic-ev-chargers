import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
} from '@chakra-ui/react';
import { MdLocalShipping } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { products } from '../components/data/productdata.js';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export default function Simple() {
  const { id } = useParams();
  const product = products.find((product) => product.id === id);

  let encodedMessage = encodeURIComponent(
    `Hi, I would like to order ${product?.name} for AED ${product?.price}`
  );

  const [selectedColor, setSelectedColor] = useState(
    product?.color?.length > 0 ? product.color[0] : null
  );
  const [selectedPort, setSelectedPort] = useState(
    product?.ports?.length > 0 ? product.ports[0] : null
  );

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handlePortSelection = (port) => {
    setSelectedPort(port);
  };

  if (!product) {
    return <div>Product not found.</div>;
  }

  const renderedDescription = product.longDescription
    .split('\n')
    .map((str, index) => (
      <>
        <br />
        <p key={index}>{str}</p>
      </>
    ));

  const metaDescription = `${product?.name} - AED ${product?.price}. ${product?.description}`;

  return (
    <Container maxW={'7xl'} dir='rtl'>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <TransformWrapper>
            <TransformComponent>
              <Link to={`/product/${product.id}`}>
                <img
                  src={
                    selectedColor?.imageUrl ||
                    selectedPort?.image ||
                    product?.imageUrl ||
                    product?.imageSource
                  }
                  alt={product.imageAlt ? product.imageAlt : product.name}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Link>
            </TransformComponent>
          </TransformWrapper>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              as='h2'
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {product.name}
            </Heading>
            <Text fontWeight={400} fontSize={'2xl'}>
              {`AED ${product.price} `}
            </Text>
          </Box>
          <Box>
            <Text color={'gray.500'} fontSize={'xl'}>
              {product.description}
            </Text>
          </Box>
          {product.color?.length > 0 && (
            <Box>
              <Stack spacing={3} direction="row" align="center">
                {product.color.map((color) => (
                  <Button
                    key={color.name}
                    rounded={'none'}
                    w={'full'}
                    mt={0}
                    size={'lg'}
                    py={'6'}
                    bg={color === selectedColor ? 'green.500' : 'gray.200'}
                    color={color === selectedColor ? 'white' : 'gray.500'}
                    textTransform={'uppercase'}
                    _hover={{
                      transform: 'translateY(2px)',
                      boxShadow: 'lg',
                    }}
                    onClick={() => handleColorSelection(color)}
                  >
                    {color.name}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}
          {product.ports?.length > 0 && (
            <Box>
              <Stack spacing={3} direction="row" align="center">
                {product.ports.map((port) => (
                  <Button
                    key={port.name}
                    rounded={'none'}
                    w={'full'}
                    mt={0}
                    size={'lg'}
                    py={'6'}
                    bg={port === selectedPort ? 'green.500' : 'gray.200'}
                    color={port === selectedPort ? 'white' : 'gray.500'}
                    textTransform={'uppercase'}
                    _hover={{
                      transform: 'translateY(2px)',
                      boxShadow: 'lg',
                    }}
                    onClick={() => handlePortSelection(port)}
                  >
                    {port.type}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>يتم التوصيل 1-2 يوم عمل</Text>
          </Stack>
          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={'green.500'}
            color={'white'}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
            onClick={() => {
              window.open(
                `https://wa.me/971501679410?text=${encodedMessage}`,
                '_blank'
              );
            }}
          >
            Order Now
          </Button>
        </Stack>
        <Box>
          <Text color={'gray.500'} fontSize={'xl'} mt={8}>
            {renderedDescription}
          </Text>
          <img src={product.illustration} alt={product.name} />
              <Heading as="h2" size="md" my={2}>
                الخصائص:
              </Heading>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>الخاصية</Th>
                <Th>الوصف</Th>
              </Tr>
            </Thead>
            <Tbody>
              {product.availablePorts && (
                <Tr>
                  <Td>منفذ الشحن</Td>
                  <Td>{product.availablePorts}</Td>
                </Tr>
              )}
              {product.size && (
                <Tr>
                  <Td>حجم العنصر</Td>
                  <Td>{product.size}</Td>
                </Tr>
              )}
              {product.weight && (
                <Tr>
                  <Td>الوزن</Td>
                  <Td>{product.weight}</Td>
                </Tr>
              )}
              {product.cableLength && (
                <Tr>
                  <Td>طول السلك</Td>
                  <Td>{product.cableLength}</Td>
                </Tr>
              )}
              {product.power && (
                <Tr>
                  <Td>القوة</Td>
                  <Td>{product.power}</Td>
                </Tr>
              )}
              {product.current && (
                <Tr>
                  <Td>مقدار أقصى تيار</Td>
                  <Td>{product.current}</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </SimpleGrid>
    </Container>
  );
}