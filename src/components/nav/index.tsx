'use client'

import { useTranslation } from 'react-i18next'
import { ROUTER_CONSTANTS } from '@/constants/router.constants'
import s from './nav.module.scss'
import Link from 'next/link'

export const Nav = () => {
	const { t } = useTranslation()

	// an example of translation in client components

	return (
		<div className={s.nav_wrapper}>
			<Link href={'/'} className={s.main_link}>
				{t('converter')}
			</Link>
			<nav className={s.nav}>
				{ROUTER_CONSTANTS.map((link) => {
					const { path } = link
					return (
						<Link key={path} href={path} className={s.link}>
							{t(`nav.${path}`)}
						</Link>
					)
				})}
			</nav>
		</div>
	)
}
