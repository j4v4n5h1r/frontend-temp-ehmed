// app/api/webhook/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  const token = "qMuV&x7N7nP4EUPR!ERvc9K^syP&m!V5"
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || authHeader !== `Bearer ${token}`) {
    console.error('Webhook authentication failed:', { authHeader, expected: `Bearer ${token}` })
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    
    // Process the webhook data here
    console.log('Webhook received from mypobi.com:', {
      eventType: body.eventType,
      timestamp: body.timestamp,
      data: body.data,
      webhookId: body.webhookId
    })
    
    // Handle different event types
    switch (body.eventType) {
      case 'station.online':
        console.log('Station came online:', body.data)
        // Handle station online event
        break
      case 'station.offline':
        console.log('Station went offline:', body.data)
        // Handle station offline event
        break
      case 'power_bank.dispensed':
        console.log('Power bank dispensed:', body.data)
        // Handle power bank dispensed event
        break
      case 'power_bank.returned':
        console.log('Power bank returned:', body.data)
        // Handle power bank returned event
        break
      case 'rental.started':
        console.log('Rental started:', body.data)
        // Handle rental started event
        break
      case 'rental.ended':
        console.log('Rental ended:', body.data)
        // Handle rental ended event
        break
      case 'maintenance.alert':
        console.log('Maintenance alert:', body.data)
        // Handle maintenance alert event
        break
      case 'system.alert':
        console.log('System alert:', body.data)
        // Handle system alert event
        break
      default:
        console.log('Unknown event type:', body.eventType)
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Webhook processed successfully',
        eventType: body.eventType,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Invalid payload', details: error.message },
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
