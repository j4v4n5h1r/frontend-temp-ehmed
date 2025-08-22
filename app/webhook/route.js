// app/api/webhook/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  const token = process.env.WEBHOOK_TOKEN
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || authHeader !== `Bearer ${token}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    
    // Process the webhook data here
    console.log('Webhook received:', body)
    
    // Implement your business logic
    
    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Invalid payload' },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
