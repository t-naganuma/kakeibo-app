'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { BarChart3, Home, LogOut, Menu, Settings, User } from 'lucide-react';
import { useState } from 'react';

type MenuType = 'home' | 'report' | 'account';

type MenuItem = {
	type: MenuType;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	href: string;
};

const menuItems: MenuItem[] = [
	{ type: 'home', name: 'ホーム', icon: Home, href: '#' },
	{ type: 'report', name: '集計・レポート', icon: BarChart3, href: '#' },
	{ type: 'account', name: 'アカウント設定', icon: Settings, href: '#' },
];

export const Header = () => {
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [activeMenu, setActiveMenu] = useState<MenuType>('home');

	const handleMenuClick = (menuType: MenuType) => {
		setActiveMenu(menuType);
		setIsSheetOpen(false);
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-primary">
			<div className="container flex h-16 items-center justify-between px-4">
				{/* ハンバーガーメニュー */}
				<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="lg:hidden">
							<Menu className="h-6 w-6" />
							<span className="sr-only">メニューを開く</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="w-80">
						<SheetHeader>
							<SheetTitle>メニュー</SheetTitle>
						</SheetHeader>
						<nav className="mt-6">
							<ul className="space-y-2">
								{menuItems.map((item) => (
									<li key={item.type}>
										<Button
											variant={activeMenu === item.type ? 'secondary' : 'ghost'}
											className="w-full justify-start h-12 text-base"
											onClick={() => handleMenuClick(item.type)}
										>
											<item.icon className="mr-3 h-5 w-5" />
											{item.name}
										</Button>
									</li>
								))}
							</ul>
						</nav>
						{/* ユーザーアバター */}
						<div className="flex items-center justify-between space-x-2 px-2 py-6 mt-auto">
							<div className="flex items-center">
								<Avatar className="h-8 w-8">
									<AvatarImage src="/placeholder.svg?height=32&width=32" />
									<AvatarFallback>
										<User className="h-4 w-4" />
									</AvatarFallback>
								</Avatar>
								<span className=" hidden sm:inline text-sm font-medium">
									田中 太郎
								</span>
							</div>
							<Button variant="outline">
								<LogOut className="h-6 w-6" />
								<span className="sr-only">ログアウト</span>
							</Button>
						</div>
					</SheetContent>
				</Sheet>

				{/* デスクトップ用ナビゲーション */}
				<nav className="hidden lg:flex items-center space-x-1">
					{menuItems.map((item) => (
						<Button
							key={item.type}
							variant={activeMenu === item.type ? 'secondary' : 'ghost'}
							className="h-10"
							onClick={() => handleMenuClick(item.type)}
						>
							<item.icon className="mr-2 h-4 w-4" />
							{item.name}
						</Button>
					))}
				</nav>

				{/* ユーザーアバター */}
				<div className="flex items-center justify-between space-x-2 px-2">
					<div className="flex items-center">
						<Avatar className="h-8 w-8">
							<AvatarImage src="/placeholder.svg?height=32&width=32" />
							<AvatarFallback>
								<User className="h-4 w-4" />
							</AvatarFallback>
						</Avatar>
						<span className=" hidden sm:inline text-sm font-medium">
							田中 太郎
						</span>
					</div>
					<Button variant="default">
						<LogOut className="h-6 w-6" />
						<span className="sr-only">ログアウト</span>
					</Button>
				</div>
			</div>
		</header>
	);
};
