import { Request, Response } from 'express';
import db_pool from '../database';

class GamesController {
    
    public async list(req: Request, res: Response): Promise<void> {
        const games = await db_pool.query('SELECT * FROM games');
        res.json(games);
    }

    public async getGame(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const game = await db_pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if(game.length > 0){
            return res.json(game[0]);
        }
        res.status(404).json({message: "The game doesn't exist"});
        console.log(game);
    }

    public async create(req: Request, res: Response): Promise<void> {
        await db_pool.query('INSERT INTO games set ?', [req.body]);
        res.json({message: 'Game saved'});
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db_pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({message: 'Game deleted' + id});
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db_pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The game was updated'});
    }
}

export const gamesController = new GamesController();
 
// 1:21:48 --> minuto del video 