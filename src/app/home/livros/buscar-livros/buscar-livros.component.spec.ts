import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarLivrosComponent } from './buscar-livros.component';

describe('BuscarLivrosComponent', () => {
  let component: BuscarLivrosComponent;
  let fixture: ComponentFixture<BuscarLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarLivrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
