import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    const currentLanguage = i18n.language || 'en';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title={t('common.language')}>
                    <Globe className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => changeLanguage('en')}
                    className={currentLanguage === 'en' ? 'bg-accent' : ''}
                >
                    <span className="mr-2">🇬🇧</span>
                    {t('common.english')}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => changeLanguage('hi')}
                    className={currentLanguage === 'hi' ? 'bg-accent' : ''}
                >
                    <span className="mr-2">🇮🇳</span>
                    {t('common.hindi')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
