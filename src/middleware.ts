import { NextRequest, NextResponse } from 'next/server'
import { i18nRouter } from 'next-i18n-router'
import i18nConfig from '../i18nConfig'
import { getAuthToken, getPath } from './shared/lib'
import { PROTECTED_ROUTES } from './shared/constants'

export async function middleware(request: NextRequest) {
	if (
		!(await getAuthToken()) &&
		PROTECTED_ROUTES.includes(getPath(request.nextUrl.pathname))
	) {
		const absoluteURL = new URL('/auth', request.nextUrl.origin)
		return NextResponse.redirect(absoluteURL.toString())
	}
	return i18nRouter(request, i18nConfig)
}

export const config = {
	matcher: ['/((?!api|static|.*\\..*|_next).*)'],
}
