import { Box, Container, Typography, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Instagram } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box className="bg-gray-100 border-t border-gray-200 py-6 mt-16">
      <Container
        maxWidth="lg"
        className="flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <Typography variant="body2" color="textSecondary">
          Desenvolvido por Tiago Vattos Zamboni
        </Typography>
        <Box>
          <IconButton
            component="a"
            href="https://github.com/tiagovattosz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-600 hover:text-black transition"
          >
            <GitHub />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/tiago-vattos-zamboni-680952232/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-600 hover:text-blue-700 transition"
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.instagram.com/tiagovattosz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-600 hover:text-pink-500 transition"
          >
            <Instagram />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
