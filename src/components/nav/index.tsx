import { ROUTER_CONSTANTS } from '@/constants/router.constants'
import s from './nav.module.scss'
import Link from 'next/link'

export const Nav = () => {
	return (
		<div className={s.nav_wrapper}>
			<Link href={'/'} className={s.main_link}>Конвертер</Link>
			<nav className={s.nav}>
				{ROUTER_CONSTANTS.map((link) => {
					const { path, title } = link
					return (
						<Link key={path} href={path} className={s.link}>
							{title}
						</Link>
					)
				})}
			</nav>
		</div>
	)
}
