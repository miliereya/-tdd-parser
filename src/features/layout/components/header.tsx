'use client'

import { useGlobalContext } from '@/shared/hooks'
import { deleteAuthToken } from '@/shared/lib'
import { Card, Centered, Container, Heading, Text } from '@/shared/ui'
import { Box, Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Header = () => {
	const { user, setUser, isLoading } = useGlobalContext()
	const { t, i18n } = useTranslation()
	const { push } = useRouter()

	const [isNavOpen, setNavOpen] = useState(false)

	const logoutHandler = () => {
		deleteAuthToken()
		push('/auth')
		setUser(null)
	}

	const changeLanguageHandler = (language: string) => {
		i18n.changeLanguage(language)
		localStorage.setItem('language', language)
	}

	return (
		<>
			<Card
				fullWidth
				sx={{
					position: 'fixed',
					height: '80px',
					padding: 0,
					margin: '0',
					borderRadius: 0,
					background: '#3f51b5',
					zIndex: 100,
				}}
			>
				<Container>
					<Centered row>
						<Heading
							centered={false}
							sx={{ color: '#fff', marginLeft: '30px' }}
						>
							TDD Parser
						</Heading>
						<Centered
							row
							sx={{
								gap: '20px',
								justifyContent: 'right',
								position: 'relative',
							}}
						>
							{!isLoading && (
								<>
									{user && (
										<Text sx={{ color: '#fff', width: 'min-content' }}>
											{user.email}
										</Text>
									)}
									{/* <Text sx={{ color: '#fff', width: 'min-content' }}>|</Text>
										<PrimaryButton
											onClick={logoutHandler}
											color='info'
											sx={{ color: '#000', width: 'min-content' }}
										>
											Exit
										</PrimaryButton>{' '} */}
									<Image
										width={40}
										height={33}
										alt='navigation'
										src={'/icons/burger.png'}
										style={{
											margin: '0 30px',
											cursor: 'pointer',
										}}
										onClick={() => setNavOpen((prev) => !prev)}
									/>
									{isNavOpen && (
										<Card
											sx={{
												minWidth: '180px',
												position: 'absolute',
												inset: 'auto',
												alignItems: 'left',
												top: '80px',
												right: '0',
												margin: 0,
												padding: 0,
												gap: 0,
												letterSpacing: '1px',
											}}
											onClick={() => setNavOpen(false)}
										>
											{user ? (
												<>
													<Link
														style={{
															color: '#000',
															fontSize: '20px',
															padding: '10px 15px',
														}}
														href={'create-template'}
													>
														{t('nav.create-template')}
													</Link>
													<Link
														style={{
															color: '#000',
															fontSize: '20px',
															padding: '10px 15px',
														}}
														href={'templates'}
													>
														{t('nav.templates')}
													</Link>
													<Link
														style={{
															color: '#000',
															fontSize: '20px',
															padding: '10px 15px',
														}}
														href={'databases'}
													>
														{t('nav.databases')}
													</Link>
													<Link
														style={{
															color: '#000',
															fontSize: '20px',
															padding: '10px 15px',
														}}
														onClick={logoutHandler}
														href={'auth'}
													>
														{t('nav.logout')}
													</Link>
												</>
											) : (
												<Link
													style={{
														color: '#000',
														fontSize: '20px',
														padding: '10px 15px',
													}}
													href={'auth'}
												>
													{t('nav.sign')}
												</Link>
											)}
											<Button
												style={{ padding: '0' }}
												onClick={() =>
													changeLanguageHandler(
														i18n.language === 'en' ? 'ua' : 'en'
													)
												}
											>
												<Text
													sx={{
														color: '#000',
														fontSize: '20px',
														padding: '10px 15px',
														textTransform: 'uppercase',
														// fontWeight: '700',
														letterSpacing: '1px',
														cursor: 'pointer',
													}}
												>
													{i18n.language === 'en' ? 'ua' : 'en'}
												</Text>
											</Button>
										</Card>
									)}
								</>
							)}
						</Centered>
					</Centered>
				</Container>
			</Card>
			<Box sx={{ height: '80px' }}></Box>
		</>
	)
}
