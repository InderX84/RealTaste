import { Request, Response } from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import Product from '../models/Product';
import Category from '../models/Category';

const upload = multer({ dest: 'uploads/' });

export const uploadMiddleware = upload.single('file');

export const bulkImportProducts = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const results: any[] = [];
    const errors: string[] = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        let successCount = 0;
        
        for (const row of results) {
          try {
            const product = new Product({
              name: row.name,
              description: row.description,
              price: parseFloat(row.price),
              category: row.category,
              stock: parseInt(row.stock) || 0,
              image: row.image || '',
              isAvailable: row.isAvailable !== 'false'
            });
            
            await product.save();
            successCount++;
          } catch (error: any) {
            errors.push(`Row ${results.indexOf(row) + 1}: ${error.message}`);
          }
        }

        // Clean up uploaded file
        fs.unlinkSync(req.file!.path);

        res.json({
          success: true,
          message: `Imported ${successCount} products successfully`,
          errors: errors.length > 0 ? errors : undefined
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to import products'
    });
  }
};

export const bulkImportCategories = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const results: any[] = [];
    const errors: string[] = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        let successCount = 0;
        
        for (const row of results) {
          try {
            const category = new Category({
              name: row.name,
              description: row.description || '',
              isActive: row.isActive !== 'false'
            });
            
            await category.save();
            successCount++;
          } catch (error: any) {
            errors.push(`Row ${results.indexOf(row) + 1}: ${error.message}`);
          }
        }

        // Clean up uploaded file
        fs.unlinkSync(req.file!.path);

        res.json({
          success: true,
          message: `Imported ${successCount} categories successfully`,
          errors: errors.length > 0 ? errors : undefined
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to import categories'
    });
  }
};