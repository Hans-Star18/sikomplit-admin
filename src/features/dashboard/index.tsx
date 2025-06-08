import { Header } from '@/components/partials/header';
import { Main } from '@/components/partials/main';
import { ProfileDropdown } from '@/components/partials/profile-dropdown';

export default function Dashboard() {
    return (
        <>
            <Header fixed>
                <div className="ml-auto flex items-center space-x-4">
                    <ProfileDropdown />
                </div>
            </Header>

            <Main>
                <div className="h-lvh">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nobis labore unde laboriosam quae nulla? Error nihil natus
                    animi est fugiat adipisci unde! Earum exercitationem autem
                    repudiandae, dolor harum incidunt sapiente.
                </div>
            </Main>
        </>
    );
}
