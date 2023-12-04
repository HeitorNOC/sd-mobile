import { Request, Response } from 'express';
const ApiUrl = 'https://localhost:8080/api';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const response = await fetch(`${ApiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      const errorMessage = await response.text();
      console.error('Erro ao fazer login:', errorMessage);
      res.status(response.status).json({ success: false, message: errorMessage });
    }
  } catch (error) {
    console.error('Erro ao fazer login:');
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
};


export const getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await fetch(`${ApiUrl}/posts`);
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        const errorMessage = await response.text();
        console.error('Erro ao buscar posts:', errorMessage);
        res.status(response.status).json({ success: false, message: errorMessage });
      }
    } catch (error) {
      console.error('Erro ao buscar posts:');
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
};

export const LikePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { postId, userId } = req.body;
      const response = await fetch(`${ApiUrl}/posts/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId }),
      });
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        const errorMessage = await response.text();
        console.error('Erro ao enviar o post:', errorMessage);
        res.status(response.status).json({ success: false, message: errorMessage });
      }
    } catch (error) {
      console.error('Erro ao enviar o post:');
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  };

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, username, likes, likedBy } = req.body;
    const response = await fetch(`${ApiUrl}/posts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, username, likes, likedBy }),
    });
    if (response.status === 201) {
      const data = await response.json();
      res.json(data);
    } else {
      const errorMessage = await response.text();
      console.error('Erro ao criar o post:', errorMessage);
      res.status(response.status).json({ success: false, message: errorMessage });
    }
  } catch (error) {
    console.error('Erro ao criar o post:');
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
};







