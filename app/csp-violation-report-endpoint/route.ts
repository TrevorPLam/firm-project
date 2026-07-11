import { NextRequest, NextResponse } from 'next/server';

/**
 * CSP Violation Report Endpoint
 * 
 * This endpoint receives Content Security Policy violation reports from browsers.
 * It validates the payload and logs violations without exposing secrets.
 * 
 * The endpoint returns 204 No Content to acknowledge receipt without leaking information.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON report
    const report = await request.json();

    // Validate that the report has the expected structure
    if (!report || typeof report !== 'object') {
      return new NextResponse('Invalid report format', { status: 400 });
    }

    // Extract the CSP report body (browser-specific format)
    const cspReport = report['csp-report'];
    
    if (!cspReport || typeof cspReport !== 'object') {
      return new NextResponse('Missing csp-report', { status: 400 });
    }

    // Log the violation for monitoring
    // In production, you might send this to a logging service like Sentry, DataDog, etc.
    console.error('CSP Violation:', {
      'document-uri': cspReport['document-uri'],
      'referrer': cspReport['referrer'],
      'violated-directive': cspReport['violated-directive'],
      'effective-directive': cspReport['effective-directive'],
      'original-policy': cspReport['original-policy'],
      'blocked-uri': cspReport['blocked-uri'],
      'status-code': cspReport['status-code'],
      'source-file': cspReport['source-file'],
      'line-number': cspReport['line-number'],
      'column-number': cspReport['column-number'],
    });

    // Return 204 No Content to acknowledge receipt
    // This prevents the browser from retrying and doesn't leak information
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Log parsing errors but don't expose details to the client
    console.error('Failed to parse CSP violation report:', error);
    
    // Return 400 for malformed requests
    return new NextResponse('Invalid request', { status: 400 });
  }
}
