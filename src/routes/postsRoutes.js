import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js"; // Importa as funções controladoras para lidar com a lógica dos posts

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) { 
    cb(null, file.originalname); 
  }
});

// Cria uma instância do middleware Multer
const upload = multer({ storage: storage });

// Define as rotas usando o objeto Express app
const routes = (app) => {
  app.use(express.json());

  app.get("/posts", listarPosts); 

  app.post("/posts", postarNovoPost); 

  app.post("/upload", upload.single("imagem"), uploadImagem); 

  app.put("/upload/:id",atualizarNovoPost);
};

export default routes;