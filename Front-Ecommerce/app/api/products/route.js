import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db('ecommerce');
    const products = await database.collection('products').find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  try {
    const product = await request.json();
    await client.connect();
    const database = client.db('ecommerce');
    const result = await database.collection('products').insertOne(product);
    return NextResponse.json({ _id: result.insertedId, ...product });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const product = await request.json();
    
    await client.connect();
    const database = client.db('ecommerce');
    await database.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: product }
    );
    return NextResponse.json({ message: 'Producto actualizado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await client.connect();
    const database = client.db('ecommerce');
    await database.collection('products').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: 'Producto eliminado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
  } finally {
    await client.close();
  }
} 