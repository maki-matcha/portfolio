import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import { featuredProjects, siteMeta } from '../data';

export default function ProjectsPage() {
  const pageBg = '#F9F9F9';
  const cardBg = '#FFFFFF';
  const borderColor = '#E0E0E0';
  const accent = '#888888';
  const textColor = '#121212';
  const mutedText = '#666666';

  return (
    <Box display="flex" flexDirection="column" minH="100vh" bg={pageBg} color={textColor} pt={10} pb={6} px={{ base: 4, md: 8 }}>
      <Container flex="1" maxW="7xl">
        <Stack spacing={8}>
          <Flex justify="flex-start" align="center" mb={4} flexWrap="wrap" gap={4}>
            <Box>
              <RouterLink to="/" style={{ textDecoration: 'none' }}>
                <HStack as="span" spacing={2} cursor="pointer" _hover={{ textDecoration: 'underline', opacity: 0.8 }}>
                  <ArrowLeft size={18} color="#121212" />
                  <Text color={textColor} fontWeight="bold">Back to Home</Text>
                </HStack>
              </RouterLink>
            </Box>
            <Heading size="xl" color={textColor} ml={6}>Projects List</Heading>
          </Flex>

          <Box p={6} bg={cardBg} borderRadius="lg" border={`1px solid ${borderColor}`}>
            <Text color={textColor} fontWeight="600">Here are my existing projects.</Text>
            <Text mt={2} color={mutedText} fontSize="sm">Disclaimer: Every project displayed here was created during my internship.</Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {featuredProjects.map((project) => (
              <Card key={project.id} bg={cardBg} borderRadius="md" border={`1px solid ${borderColor}`} overflow="hidden">
                <Image src={project.img} alt={project.title} objectFit="cover" h="220px" w="100%" />
                <CardBody>
                  <Flex justify="space-between" align="center" mb={4}>
                    <Heading size="md" color={textColor}>{project.title}</Heading>
                    <Badge variant="outline" borderColor="#121212" color="#121212" bg="transparent" textTransform="uppercase" fontSize="0.70rem" letterSpacing="0.06em">
                      {project.badge}
                    </Badge>
                  </Flex>
                  <Text color={mutedText} mb={4}>{project.desc}</Text>
                  <HStack spacing={2} wrap="wrap" mb={4}>
                    {project.tech.split(' / ').map((tech) => (
                      <Badge key={tech} variant="outline" borderColor="#121212" color="#121212" bg="transparent" px={3} py={1} fontSize="0.75rem">
                        {tech}
                      </Badge>
                    ))}
                  </HStack>
                  <Button as={RouterLink} to={`/projects/${project.id}`} bg="#121212" color="white" _hover={{ bg: '#333333' }} onClick={() => window.scrollTo(0, 0)}>
                    See Overview
                  </Button>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
      <Box mt={6} py={6} textAlign="center" borderTop={`1px solid ${borderColor}`} color={mutedText} bg={pageBg}>
        <Container maxW="7xl">
          <Text fontSize="sm">(c) 2026 Vincent Louise Collamat. All rights reserved.</Text>
        </Container>
      </Box>
    </Box>
  );
}
