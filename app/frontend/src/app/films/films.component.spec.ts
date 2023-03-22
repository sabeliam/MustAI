import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsComponent } from './films.component';
import { NgxsModule } from '@ngxs/store';
import { FilmsState } from './store/films.state';

describe('FilmsComponent', () => {
    let component: FilmsComponent;
    let fixture: ComponentFixture<FilmsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilmsComponent],
            imports: [NgxsModule.forRoot([FilmsState])],
        }).compileComponents();

        fixture = TestBed.createComponent(FilmsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
